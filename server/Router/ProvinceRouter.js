const express = require('express');
const router = express.Router();
const provinceController = require('../controller/ProvinceController');

router.get('/getProvince',provinceController.getProvince);
router.get('/getDistrict/:idProvince',provinceController.getDistrictsByProvince);
router.get('/getCommnune/:idDistrict',provinceController.getCommunesByDistrict);
module.exports = router;