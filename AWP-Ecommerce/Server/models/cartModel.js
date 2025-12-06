module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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