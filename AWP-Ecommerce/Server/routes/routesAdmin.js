module.exports = function(app) {

    var user = require("../controllers/userController.js")
    var products = require("../controllers/productController.js")

    app.get("/users", user.findAll)
    app.patch("/users", user.ban)
    app.delete("/users", user.destroy)
    app.delete("/products", products.destroy)
    app.post("/products", products.create)
}