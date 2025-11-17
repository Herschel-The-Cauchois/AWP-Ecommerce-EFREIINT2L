const db = require("../models")
const User = db.user
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    res.json({message : "This is a create test response"})
}

exports.findAll = (req, res) => {
    res.json({message : "This is a findAll test response"})
}

exports.findByPk = (req, res) => {
    res.json({message : "This is a findOne test response"})
}

exports.update = (req, res) => {
    res.json({message : "This is an update test response"})
}

exports.destroy = (req, res) => {
    res.json({message : "This is a delete test response"})
}

exports.deleteAll = (req, res) => {
    res.json({message : "This is a deleteAll test response"})
}

exports.findByTitle = (req, res) => {
    res.json({message : "This is a findByTitle test response"})
}