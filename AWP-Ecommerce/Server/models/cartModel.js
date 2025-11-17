module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user: {
            type: Sequelize.INTEGER
        },
        product: {
            type: Sequelize.INTEGER
        },
        
    }) 

    return Cart
}