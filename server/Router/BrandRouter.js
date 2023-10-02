const express = require('express');
const router = express.Router();
const brandController = require('../controller/BrandController');


router.post('/addBrand', brandController.addBrand);
router.get('/getBrand', brandController.getAllBrand);
module.exports = router;
