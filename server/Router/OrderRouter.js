const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');


router.post('/addOrder/:userId', orderController.addOrder);
router.put('/updateOrder/:orderId', orderController.updateOrderStatus);
router.get('/waiting-for-confirmation', orderController.getOrdersWaitingForConfirmation);
router.get('/home-delivery', orderController.getOrdersHomeDelivery);
router.get('/store-pickup', orderController.getOrdersStorePickup);
router.get('/completed', orderController.getCompletedOrders);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.delete('/cancel/:orderId',orderController.cancelOrder)
module.exports = router;
