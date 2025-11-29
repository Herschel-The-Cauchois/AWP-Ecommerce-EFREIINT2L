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
                    res.send({ message: "User registered successfully." })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({ message: "User registered successfully." })
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
    res.json({message : "This is a findOne test response"})
}

exports.ban = (req, res) => {
    res.json({message : "This is a ban test response"})
}

exports.delete = (req, res) => {
    res.json({message : "This is a delete test response"})
}