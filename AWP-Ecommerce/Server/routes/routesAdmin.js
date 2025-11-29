module.exports = function(app) {

    var user = require("../controllers/userController.js")
    var products = require("../controllers/productController.js")

    app.get("/users", user.fetch)
    app.options("/users", user.grantOrDemote)
    app.patch("/users", user.ban)
    app.delete("/users", user.delete)
    app.delete("/products", products.destroy)
    app.post("/products", products.create)
}