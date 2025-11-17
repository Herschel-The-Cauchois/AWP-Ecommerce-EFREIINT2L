module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        isBanned: {
            type: Sequelize.BOOLEAN
        },
        password: {
            type: Sequelize.STRING
        },
    })

    return User
}