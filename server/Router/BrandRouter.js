const express = require('express');
const router = express.Router();
const brandController = require('../controller/BrandController');


router.post('/addBrand', brandController.addBrand);
router.get('/getBrand', brandController.getAllBrand);
router.put('/updateBrand', brandController.updateBrand);
router.delete('/updateBrand', brandController.deleteBrand);
module.exports = router;
