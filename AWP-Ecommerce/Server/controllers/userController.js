const db = require("../models")
const User = db.user
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    res.json({message : "This is a create test response"})
}

exports.logIn = (req, res) => {
    res.json({message : "This is a logIn test response"})
}

exports.findAll = (req, res) => {
    res.json({message : "This is a findAll test response"})
}

exports.findByPk = (req, res) => {
    res.json({message : "This is a findOne test response"})
}

exports.ban = (req, res) => {
    res.json({message : "This is a ban test response"})
}

exports.destroy = (req, res) => {
    res.json({message : "This is a delete test response"})
}