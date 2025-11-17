const db = require("../models")
const Product = db.product
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    res.json({message : "This is a create test response"})
}

exports.findAll = (req, res) => {
    res.json({message : "This is a findAll test response"})
}

exports.findByCat = (req, res) => {
    res.json({message : "This is a findOne test response"})
}

exports.destroy = (req, res) => {
    res.json({message : "This is a delete test response"})
}