module.exports = function(app) {

    var user = require("../controllers/userController.js")
    var { verifySignUp } = require("../middleware")

    app.get("/", (req, res) => {
        res.json({message: "Hello EFREI student - your server is on line"})
    })

    app.post("/users", user.logIn)
    app.put("/users", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], user.create)
}