const express = require('express');
const router = express.Router();
const bannerController = require('../controller/BannerController');
const { authMiddleware } = require('../middleware/authMiddleware');



router.post('/addBanner',authMiddleware, bannerController.addBanner);
router.get('/getBanner',bannerController.getAllBanners);
router.put('/editBanner',authMiddleware,bannerController.editBanner);
router.delete('/deleteBanner',authMiddleware,bannerController.deleteBanner);
module.exports = router;