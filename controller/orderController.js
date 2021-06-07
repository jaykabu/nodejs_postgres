const {Order, Product} = require('../models');

exports.create_order = (req, res) => {
    // debugger
    Product.findByPk(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: 'Product Id not found'
                })
            }
            Order.create({quantity: req.body.quantity, productId: req.body.productId})
        })
        .then(result => {
            res.status(201).json({
                message: 'Order stored',
                order: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.get_all_order = (req, res) => {
    Order.findAll()
        .then(result => {
            res.status(200).json({
                Orders: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.get_order_byId = (req, res) => {
    const id = req.params.id;

    Order.findOne({where: {id}})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Order Id not found'
                })
            }
            res.status(200).json({
                order: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_order = (req, res) => {
    const id = req.params.id;

    Order.destroy({where: {id}})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Order Id not found'
                })
            }
            res.status(200).json({
                messge: 'Order deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};