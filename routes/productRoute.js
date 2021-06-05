const express = require('express');

const router = express.Router();
const ProductController = require('../controller/productsController');

router.post('/', ProductController.create_product)
router.get('/', ProductController.get_all_product)
router.get('/:id', ProductController.get_product_byId)
router.patch('/:id', ProductController.update_product)
router.delete('/:id', ProductController.delete_product)

module.exports = router;