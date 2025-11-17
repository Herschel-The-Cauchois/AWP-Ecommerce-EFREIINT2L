const db = require("../models")
const Product = db.product
const Op = db.Sequelize.Op

//Include f°s to interact with table linking user cart to product, via matching IDs for JOIN queries

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