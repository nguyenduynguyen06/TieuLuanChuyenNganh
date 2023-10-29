const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');


router.post('/addOrder/:userId',authUserMiddleware, orderController.addOrder);
router.put('/updateOrder/:orderId',authMiddleware, orderController.updateOrderStatus);
router.put('/completeOrder/:orderId',authMiddleware, orderController.completeOrder);
router.get('/waiting-for-confirmation', orderController.getOrdersWaitingForConfirmation);
router.get('/home-delivery', orderController.getOrdersHomeDeliveryReady);
router.get('/home-delivery-shipping', orderController.getOrdersHomeDeliveryShipping);
router.get('/store-pickup-getready', orderController.getOrdersStorePickupgetReady);
router.get('/store-pickup-ready', orderController.getOrdersStorePickupReady);
router.get('/completedAtStore', orderController.getCompletedOrdersAtStore);
router.get('/completedShipping', orderController.getCompletedOrdersShipping);
router.get('/searchOrder', orderController.searchOrder);
router.get('/searchOrderAtStoreComplete', orderController.searchOrderAtStoreComplete);
router.get('/searchOrderShippingComplete', orderController.searchOrderShippingComplete);
router.get('/searchOrderGetReady', orderController.searchOrderGetReady);
router.get('/searchOrderShipping', orderController.searchOrderShipping);
router.get('/searchOrderGetReadyAtStore', orderController.searchOrderGetReadyAtStore);
router.get('/searchOrderReady', orderController.searchOrderReady);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.delete('/cancel/:orderId',orderController.cancelOrder)
router.get('/getOrderShipping', orderController.getOrdersShipping);
module.exports = router;
