const db = require("../models")
const Product = db.product
const Op = db.Sequelize.Op
const config = require("../config/auth.config.js")

var jwt = require("jsonwebtoken")

exports.create = (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if ([req.body.name, req.body.category, req.body.description, req.body.price, req.body.rating, req.body.imgurl, req.body.start, req.body.end, req.body.providerName].includes(undefined)) {
        return res.status(400).send({ message: "Incomplete information submitted." })
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
        if (decoded.isProvider === undefined | decoded.isProvider == 0) {
            return res.status(403).send({ message : "You are not allowed to create a new product." })
        }
        if (decoded.id === undefined) {
            return res.status(400).send({ message : "Malformed JWT token provided"})
        }
        Product.create({ //No duplicates check because for logistical reasons providers can provide two versions of the same event, but managed by different staff
            name : req.body.name,
            category : req.body.category,
            description : req.body.description,
            price : req.body.price,
            rating : req.body.rating,
            imgurl : req.body.imgurl,
            start : req.body.start, //IMPORTANT : dates in DD-MM-YY HH:MM:SS
            end : req.body.end,
            provider : decoded.id,
            providerName : req.body.providerName
        }).then(() => {
            return res.status(200).send({ message: "Product created !" })
        }).catch((err) => {
            return res.status(500).send({ message: err.message })
        })
    })
}

exports.findAll = (req, res) => {
	if (req.query.providerView !== undefined & req.query.provider !== undefined) {
		console.log("answering for a provider")
		if (req.query.providerView == 'true') { //For their own dashboard, the providers only have access to their own product.
			Product.findAll({ where: { provider: Number(req.query.provider)}}).then(products => {
				return res.status(200).send({ message: "List of products", data: products})
			}).catch(err => {
				return res.status(500).send({ message: err.message })
			})
		} else {
			return res.status(400).send({ message: "Non-empty parameters but invalid parameters. providerView should be true or undefined" })
		}
	} else {
		console.log("answering for a regular user")
		Product.findAll().then(products => {
			return res.status(200).send({ message: "List of products", data: products})
		}).catch(err => {
			return res.status(500).send({ message: err.message })
		})
	}
}

exports.findByCat = (req, res) => {
    Product.findAll({ where: { category: req.params.category } }).then(products => {
        if (!products) {
            return res.status(400).send({ message: "No matching product was found."})
        }
        return res.status(200).send({ message: "List of products of category " + req.params.category + ".", data: products})
    }).catch(err => {
        return res.status(500).send({ message: err.message })
    })
}

exports.destroy = (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send({ message : "Empty request body." })
    }
    if (req.body.token === undefined) {
        return res.status(401).send({ message : "No valid credentials found." })
    }
    if (req.body.product === undefined) {
        return res.status(400).send({ message : "Missing product parameter." })
    }
    jwt.verify(req.body.token, config.secret, (err, decoded) => { 
        if (err) { 
            return res.status(401).send({ 
                message: "Unauthorized." 
            }); 
        } 
        if ((decoded.isAdmin === undefined | decoded.isProvider === undefined) | (decoded.isAdmin == 0 & decoded.isProvider == 0)) { //If isAdmin or isProvider fields undefined or both at 0
            return res.status(403).send({ message : "You are not allowed to perform access modification." })
        }
        Product.findOne({ attributes: ['id'], where: { id: req.body.product }}).then(prod => {
            if (!prod) {
                return res.status(404).send({ message : "Product not found." })
            }
            Product.destroy({ where: { id: prod.id }}).then(() => {
                return res.status(200).send({ message : "Product deleted." })
            }).catch((err) => {
                return res.status(500).send({ message: "Deletion failed : " + err.message })
            })
        }).catch(err => {
            return res.status(500).send({ message: "Exception has occurred during product fetching : " + err.message })
        })
    })
}
