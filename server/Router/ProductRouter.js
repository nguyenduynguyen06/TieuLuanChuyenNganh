const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const { addProductVariant } = require('../controller/ProductVariantController');


router.post('/addProduct', productController.addProduct);
router.post('/addProductvariant', addProductVariant);
router.get('/getIdByBrand/:brandId', productController.getProductByBrandId);
router.get('/getIdByCategory/:categoryId', productController.getProductsByCategory);
router.put('/editProduct/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/searchProduct', productController.searchProducts);
module.exports = router;