const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');


router.post('/addOrder/:userId', orderController.addOrder);
module.exports = router;
