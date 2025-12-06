module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        },
        price: {
            type: Sequelize.FLOAT
        },
        rating: {
            type: Sequelize.FLOAT
        },
        imgurl: {
            type: Sequelize.STRING
        },
        provider: {
            type: Sequelize.INTEGER
        },
        providerName: {
            type: Sequelize.STRING
        }
    })

    return Product
}