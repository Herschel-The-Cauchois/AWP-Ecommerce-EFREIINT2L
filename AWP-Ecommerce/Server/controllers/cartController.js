const db = require("../models")
const config = require("../config/auth.config.js")
const Cart = db.cart
const Product = db.product
const User = db.user
const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")

exports.create = async (req, res) => {
    if (req.body === undefined) {
        return res.status(401).send({ message : "No credentials found." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.product === undefined | req.body.user === undefined) {
        return res.status(400).send({ message: "Missing product and user parameters." })
    }
    //Do product and user verification request
    const user = await User.findOne({ where : { id: req.body.user } }).catch(err => {
        return res.status(500).send({ message: "Error during user checking : " + err })
    }) //Waits asynchronously the result and then checks if it yielded something
    if (!user) {
        return res.status(404).send({ message: "Unknow user." })
    }
    const prod = await Product.findOne({ where : { id: req.body.product } }).catch(err => {
        return res.status(500).send({ message: "Error during product checking : " + err })
    })
    if (!prod) {
        return res.status(404).send({ message: "Unknow product." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { //We just need our token to be valid this time
        if (err) { 
            return res.status(401).send({ 
                message: "Unauthorized." 
            }); 
        } 
        if (decoded.id !== req.body.user & !decoded.isAdmin) {
            return res.status(403).send({ message: "You are not allowed to perform this operation" })
        }
        Cart.create({
            user: req.body.user,
            product: req.body.product
        }).then(() => {
            return res.status(200).send({ message: "Product added to cart." })
        }).catch(err => {
            return res.status(500).send({ message: "Error while adding product to cart : " + err})
        })
    })
}

exports.findAll = (req, res) => {
    if (req.query === undefined) {
        return res.status(401).send({ message : "No credentials found." })
    }
    if (req.query.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    jwt.verify(req.query.token, config.secret, (err, decoded) => { //We just need our token to be valid this time
        if (err) { 
            return res.status(401).send({ 
                message: "Unauthorized." 
            }); 
        } 
        Product.findAll({ include: [{ model: User, where: { id: decoded.id }, required: true }] }).then(records => {
            return res.status(200).send({ message: "ARRAY of products on user's cart", data: records})
        }).catch( err => {
            return res.status(500).send({ message: "Exception has occured during cart fetching : " + err})
        })
    })
}

exports.destroy = (req, res) => {
    if (req.body === undefined) {
        return res.status(401).send({ message : "No credentials found." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.product === undefined | req.body.user === undefined) {
        return res.status(400).send({ message: "Missing product and user parameters." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { //We just need our token to be valid this time
        if (err) { 
            return res.status(401).send({ 
                message: "Unauthorized." 
            }); 
        } 
        if (decoded.id !== req.body.user & !decoded.isAdmin) { //If user specified in request and user id in token different and user not admin
            return res.status(403).send({ message: "You are not allowed to perform this operation" })
        }
        Cart.findOne({ where: {
            user: req.body.user,
            product: req.body.product
        } }).then((record) => {
            if (!record) {
                return res.status(404).send({ message: "Record of cart not found." })
            }
            Cart.destroy({ where: {
                user: req.body.user,
                product: req.body.product
            } }).then(() => {
                return res.status(200).send({ message: "Product removed from cart." })
            }).catch(err => {
                return res.status(500).send({ message: "Error while removing product from cart : " + err})
            })
        }).catch(err => {
            return res.status(500).send({ message: "Error while removing product from cart : " + err})
        })
    })
}
