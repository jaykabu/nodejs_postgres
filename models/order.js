'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        productId: DataTypes.INTEGER,
        quantity: {
            type: DataTypes.STRING,
            defaultValue: 1
        }
    }, {
        sequelize,
        tableName: 'Orders',
        modelName: 'Order',
        timestamps: false
    });
    //using Product id
    Order.associate = function (models) {
        Order.belongsTo(models.Product, {
            foreignKey: 'productId', as: 'product'
        })
    }
    return Order;
};