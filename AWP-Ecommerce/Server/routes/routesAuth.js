module.exports = function(app) {

    var user = require("../controllers/userController.js")

    app.get("/", (req, res) => {
        res.json({message: "Hello EFREI student - your server is on line"})
    })

    app.post("/users", user.logIn)
    app.put("/users", user.create)
}