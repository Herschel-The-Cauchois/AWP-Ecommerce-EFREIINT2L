module.exports = function(app) {

    var user = require("../controllers/userController.js")
    var products = require("../controllers/productController.js")

    app.get("/users", user.fetch)
    app.patch("/users", user.grantOrDemote)
    app.lock("/users", user.ban)
    app.unlock("/users", user.unban) //I split the function just to use both lock and unlock request types. It's neater to me !
    app.delete("/users", user.delete)
    app.report("/users", user.provideOrNot)
    app.delete("/products", products.destroy)
    app.put("/products", products.create)
}