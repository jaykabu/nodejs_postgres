const express = require('express');
const router = express.Router();

const OrderController = require('../controller/orderController')

router.post('/', OrderController.create_order);
router.get('/', OrderController.get_all_order);
router.get('/:id', OrderController.get_order_byId)
router.delete('/:id', OrderController.delete_order)

module.exports = router;