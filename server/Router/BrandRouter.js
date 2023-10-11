const express = require('express');
const router = express.Router();
const brandController = require('../controller/BrandController');


router.post('/addBrand', brandController.addBrand);
router.get('/getBrand/:categoryId', brandController.getAllBrand);
router.put('/updateBrand/:id', brandController.updateBrand);
router.delete('/delete/:id', brandController.deleteBrand);
module.exports = router;
