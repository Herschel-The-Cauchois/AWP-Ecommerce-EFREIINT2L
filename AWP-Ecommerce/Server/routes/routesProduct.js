module.exports = function(app) {

    var products = require("../controllers/productController.js")
    var cart = require("../controllers/cartController.js")

    app.get("/products", products.findAll)
    app.get("/products/:category", products.findByCat) //Only triggered if dropdown is other than -
    app.get("/cart", cart.findAll)
    app.delete("/cart", cart.destroy)
    app.put("/cart", cart.create)
}