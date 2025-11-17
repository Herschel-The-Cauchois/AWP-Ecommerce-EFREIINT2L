module.exports = function(app) {

    var user = require("../controllers/userController.js")

    app.get("/", (req, res) => {
        res.json({message: "Hello EFREI student - your server is on line"})
    })

    app.post("/auth", user.create) //Log in method to be placed
    app.post("/users", user.create)
}