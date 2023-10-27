const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/addOrder/:userId', orderController.addOrder);
router.put('/updateOrder/:orderId',authMiddleware, orderController.updateOrderStatus);
router.put('/completeOrder/:orderId',authMiddleware, orderController.completeOrder);
router.get('/waiting-for-confirmation', orderController.getOrdersWaitingForConfirmation);
router.get('/home-delivery', orderController.getOrdersHomeDelivery);
router.get('/store-pickup-getready', orderController.getOrdersStorePickupgetReady);
router.get('/store-pickup-ready', orderController.getOrdersStorePickupReady);
router.get('/completedAtStore', orderController.getCompletedOrdersAtStore);
router.get('/completedShipping', orderController.getCompletedOrdersShipping);
router.get('/searchOrder', orderController.searchOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.delete('/cancel/:orderId',orderController.cancelOrder)
router.get('/getOrderShipping', orderController.getOrdersShipping);
module.exports = router;
