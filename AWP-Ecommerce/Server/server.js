const express = require("express")
const cors = require("cors")
const route1 = require("./routes/routesAdmin.js")
const route2 = require("./routes/routesAuth.js")
const route3 = require("./routes/routesProduct.js")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "Hello EFREI Student, your server is on line :D"})
})

const db = require("./models")
db.sequelize.sync({alter: true}).then(() => { //Keeps former db data
    console.log("Sync db.")
    db.role.findOne({ where: { id: 1 }}).then(role => { //Checks if roles are already in db, else creates them
        if (!role) {
            db.role.create({
                id: 1,
                name: "user"
            })
        }
    })
    db.role.findOne({ where: { id: 2 }}).then(role => {
        if (!role) {
            db.role.create({
                id: 2,
                name: "admin"
            })
        }
    })
}).catch((err) => {
    console.log("Failed to sync db: " + err.message)
})

route1(app)
route2(app)
route3(app)

app.listen(5000, () => {
    console.log("Server has started !")
})