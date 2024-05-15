const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');


router.post('/addOrder/:userId', orderController.addOrder);
router.put('/updateOrder/:orderId',authMiddleware, orderController.updateOrderStatus);
router.put('/completeOrder/:orderId', authMiddleware , orderController.completeOrder);
router.put('/deliveredOrder/:orderId', authMiddleware , orderController.deliveredOrder);
router.put('/completeOrderUser/:orderCode', orderController.completeOrderUser);
router.get('/getAllOrdersPending',authMiddleware, orderController.getAllOrdersPending);
router.get('/getAllOrdersReady',authMiddleware, orderController.getAllOrdersReady);
router.get('/getAllOrdersDelivery',authMiddleware, orderController.getAllOrdersDelivery);
router.get('/getAllOrdersComplete',authMiddleware, orderController.getAllOrdersComplete);
router.get('/getAllOrdersReadyCancel',authMiddleware, orderController.getAllOrdersReadyCancel);
router.get('/getAllOrdersCancel',authMiddleware, orderController.getAllOrdersCancel);
router.get('/getAllOrdersDashBoard',authMiddleware, orderController.getAllOrdersDashboard);
router.get('/getAllOrdersDelivered',authMiddleware, orderController.getAllOrdersDelivered);
router.get('/searchOrderPending',authMiddleware, orderController.searchOrderPending);
router.get('/searchOrderReady',authMiddleware, orderController.searchOrderReady);
router.get('/searchOrderCancel',authMiddleware, orderController.searchOrderCancel);
router.get('/searchOrderDelivery',authMiddleware, orderController.searchOrderDelivery);
router.get('/searchOrderDelivered',authMiddleware, orderController.searchOrderDelivered);
router.get('/searchOrderReadyCancel',authMiddleware, orderController.searchOrderReadyCancel);
router.get('/searchOrderComplete',authMiddleware, orderController.searchOrderComplete);
router.put('/cancelOrderWithReason/:orderId',authMiddleware, orderController.cancelOrderWithReason);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.get('/oderDetails/:orderCode', orderController.getOrdersDetails);
router.delete('/delete/:orderId',authMiddleware,orderController.deleteOrder)
router.put('/cancel/:orderCode',orderController.cancelOrderbyUser)
router.put('/rating',orderController.addProductRating)
router.put('/changeProduct/:id/:orderId', authMiddleware,orderController.changeProduct)
router.put('/checkBH',orderController.checkBH)
module.exports = router;
