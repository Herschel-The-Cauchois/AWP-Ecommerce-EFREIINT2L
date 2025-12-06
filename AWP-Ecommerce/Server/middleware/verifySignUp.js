const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.username === undefined | req.body.email === undefined | req.body.password === undefined) {
        return res.status(400).send({ message : "Missing parameters." })
    }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({ message: "Failed. Username already in use." })
            return
        }

        User.findOne({ where: { email: req.body.email } }).then(user => {
            if (user) {
                res.status(400).send({ message: "Failed. Email already in use." })
                return
            } else {
                next() //Moving the next() is crucial to avoid ERR_HTTP_HEADERS_SENT and the creation of an account with a duplicate email
            }
        })
    })
}

checkRolesExisted = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Role " + req.body.roles[i] + " does not exist."
                })
                return
            }
        }
    }

    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp