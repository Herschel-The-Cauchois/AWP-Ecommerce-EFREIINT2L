const dbConfig = require("../config/db.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./userModel.js")(sequelize, Sequelize)
console.log(">>> Loading other models...")
db.product = require("./productModel.js")(sequelize, Sequelize)
db.cart = require("./cartModel.js")(sequelize, Sequelize)
db.role = require("./roleModel.js")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

db.product.belongsToMany(db.user, {
    through: db.cart,
    foreignKey: "product",
    otherKey: "user"
})
db.user.belongsToMany(db.product, {
    through: db.cart,
    foreignKey: "user",
    otherKey: "product"
}) //Specify user-cart relationships

db.ROLES = ["user", "admin", "provider"] //provider can book events AND propose others

module.exports = db