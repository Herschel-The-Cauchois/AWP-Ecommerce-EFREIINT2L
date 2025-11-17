module.exports = function(app) {

    var user = require("../controllers/userController.js")
    var product = require("../controllers/productController.js")

    app.get("/users", user.findAll)
    app.patch("/users", user.create) //Should create ban method
    app.delete("/users", user.destroy)
    //do the same with products
}