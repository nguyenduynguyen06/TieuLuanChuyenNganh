const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const productvariantController = require('../controller/ProductVariantController');


router.post('/addProduct', productController.addProduct);
router.post('/addProductvariant/:id', productvariantController.addProductVariant);
router.get('/getIdByBrand/:brandId', productController.getProductByBrandId);
router.get('/getIdByCategory/:categoryId', productController.getProductsByCategory);
router.put('/editProduct/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/searchProduct', productController.searchProducts);
router.delete('/deleteVariant/:id', productvariantController.deleteProductVariant);
router.put('/editProductVariant/:id', productvariantController.updateProductVariant);
router.post('/addAttributes/:id', productvariantController.addAttributes);
router.delete('/deleteAttributes/:id/:attributeIdToRemove', productvariantController.deleteAttributes);
router.get('/getAll',productController.getAllProduct)
module.exports = router;