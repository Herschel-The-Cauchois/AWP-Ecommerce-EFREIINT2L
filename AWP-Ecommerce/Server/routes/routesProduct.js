module.exports = function(app) {

    var products = require("../controllers/productController.js")

    app.post("/products", products.create)
    app.get("/products", products.findAll)
    app.get("/productsById", products.findByPk)
    app.delete("/products", products.destroy)
}