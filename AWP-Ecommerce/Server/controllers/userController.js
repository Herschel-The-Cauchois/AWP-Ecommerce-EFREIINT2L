const db = require("../models")
const config = require("../config/auth.config.js")
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")


exports.create = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isBanned: 0
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(200).send({ message: "User registered successfully." })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.status(200).send({ message: "User registered successfully." })
            })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.logIn = (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
        if (!user) {
            return res.status(404).send({ message : "User not found." })
        }
        var passwordValidity = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordValidity) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password."
            })
        }
        if (user.isBanned) { //case of admin side blocking
            return res.status(403).send({
                accessToken: null,
                message: "You have been forbidden from using this service."
            })
        }

        var authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            var isAdmin = (authorities.includes("ROLE_ADMIN")) ? true : false
            var token = jwt.sign({ id: user.id, username: user.username, isAdmin: isAdmin }, config.secret, {
                expiresIn: 86400
            })
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.fetch = (req, res) => {
    if (req.body === undefined) {
        return res.status(401).send({ message : "No credentials found." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
          return res.status(401).send({ 
            message: "Unauthorized." 
          }); 
        } 
        if (decoded.isAdmin === undefined | decoded.isAdmin == 0) {
            return res.status(403).send({ message : "You are not allowed to access the list of users." })
        }
        User.findAll({ attributes: ['id', 'username', 'email', 'isBanned', 'createdAt'] }).then( users => {
            return res.status(200).send({ message: "List of users", data: users})
        })
    })
}

exports.grantOrDemote = (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.user === undefined | req.body.grant === undefined) {
        return res.status(400).send({ message : "Missing request parameters." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
          return res.status(401).send({ 
            message: "Unauthorized." 
          }); 
        } 
        if (decoded.isAdmin === undefined | decoded.isAdmin == 0) {
            return res.status(403).send({ message : "You are not allowed to perform privilege modification." })
        }
        User.findOne({ attributes: ['id', 'isBanned'], where: {
            [Op.and]: [{id: req.body.user}, {isBanned: 0}] //Prerequisite of privilege modification is user to not be banned, else will not perform operation
        }}).then( user => {
            if (!user) {
                return res.status(404).send({ message : "User not found." })
            }
            if (req.body.grant) {
                user.setRoles([2]).then(() => {
                    return res.status(200).send({ message : "User has been granted administrative privileges." })
                }).catch(err => {
                    return res.status(500).send({ message: "Exception has occurred during privilege update : " + err.message })
                })
            } else {
                user.setRoles([1]).then(() => {
                    return res.status(200).send({ message : "User has been demoted to user privileges." })
                }).catch(err => {
                    return res.status(500).send({ message: "Exception has occurred during privilege update : " + err.message })
                })
            }
        }).catch(err => {
            return res.status(500).send({ message: "Exception has occurred during user fetching : " + err.message })
        })
    })
}

exports.ban = (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.user === undefined) {
        return res.status(400).send({ message : "Missing user parameter." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
          return res.status(401).send({ 
            message: "Unauthorized." 
          }); 
        } 
        if (decoded.isAdmin === undefined | decoded.isAdmin == 0) {
            return res.status(403).send({ message : "You are not allowed to perform access modification." })
        }
        User.findOne({ attributes: ['id', 'isBanned'], where: {
            [Op.and]: [{id: req.body.user}, {isBanned: 0}]
        }}).then( user => {
            if (!user) {
                return res.status(404).send({ message : "User not found." })
            }
            User.update({ "isBanned": 1 }, { where: {
                id: user.id
            }}).then(() => {
                return res.status(200).send({ message : "User banned." })
            }).catch((err) => {
                return res.status(500).send({ message: "Banishment failed : " + err.message })
            })
        }).catch(err => {
            return res.status(500).send({ message: "Exception has occurred during user fetching : " + err.message })
        })
    })
}

exports.unban = (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.user === undefined) {
        return res.status(400).send({ message : "Missing user parameter." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
          return res.status(401).send({ 
            message: "Unauthorized." 
          }); 
        } 
        if (decoded.isAdmin === undefined | decoded.isAdmin == 0) {
            return res.status(403).send({ message : "You are not allowed to perform access modification." })
        }
        User.findOne({ attributes: ['id', 'isBanned'], where: {
            [Op.and]: [{id: req.body.user}, {isBanned: 1}]
        }}).then( user => {
            if (!user) {
                return res.status(404).send({ message : "User not found." })
            }
            User.update({ "isBanned": 0 }, { where: {
                id: user.id
            }}).then(() => {
                return res.status(200).send({ message : "User unbanned." })
            }).catch((err) => {
                return res.status(500).send({ message: "Debanishment failed : " + err.message })
            })
        }).catch(err => {
            return res.status(500).send({ message: "Exception has occurred during user fetching : " + err.message })
        })
    })
}

exports.delete = (req, res) => { //Frontend wise, SHOULD NOT BE REQUESTED WITHOUT CONFIRMATION ALERT
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.user === undefined) {
        return res.status(400).send({ message : "Missing user parameter." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
          return res.status(401).send({ 
            message: "Unauthorized." 
          }); 
        } 
        if (decoded.isAdmin === undefined | decoded.isAdmin == 0) {
            return res.status(403).send({ message : "You are not allowed to perform access modification." })
        }
        User.findOne({ attributes: ['id'], where: { id: req.body.user }}).then( user => {
            if (!user) {
                return res.status(404).send({ message : "User not found." })
            }
            user.setRoles([]).then(() => {
                    User.destroy({ where: { id: user.id }}).then(() => {
                        return res.status(200).send({ message : "User deleted." })
                    }).catch((err) => {
                        return res.status(500).send({ message: "Deletion failed : " + err.message })
                    })
                }).catch(err => {
                    return res.status(500).send({ message: "Exception has occurred during role removal : " + err.message })
                })
        }).catch(err => {
            return res.status(500).send({ message: "Exception has occurred during user fetching : " + err.message })
        })
    })
}