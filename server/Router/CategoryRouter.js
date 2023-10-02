const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');


router.post('/addCategory', categoryController.addCategory);

module.exports = router;
