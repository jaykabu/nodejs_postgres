const {Product} = require('../models');


exports.create_product = async (req, res) => {
    try {
        const {name, price} = req.body;
        const product = await Product.create({name, price});
        res.status(201).json({
            message: 'Product created',
            result: product
        });
    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            error: err
        });
    }
}

exports.get_all_product = (req, res) => {
    Product.findAll()
        .then(result => {
            res.status(200).json({
                message: 'Get all product',
                Products: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.get_product_byId = (req, res) => {
    const id = req.params.id;
    Product.findOne({where: {id}})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Product not found'
                });
            }
            res.status(200).json({
                Product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.update_product = (req, res) => {
    const id = req.params.id;
    const {name, price} = req.body;
    Product.update({name, price}, {where: {id}})
        .then(result => {
            res.status(200).json({
                message: 'Update product successfully',
                Product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_product = (req, res) => {
    const id = req.params.id;
    Product.destroy( {where: {id}})
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Product already deleted'
                });
            }
            res.status(200).json({
                message: 'Delete product successfully',
                Product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}