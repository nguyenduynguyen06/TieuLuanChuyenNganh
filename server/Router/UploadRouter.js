const express = require('express');
const Product = require('../Model/ProductModel');
const User = require('../Model/UserModel')
const { uploadFile } = require('../controller/UploadFile'); 
const router = express.Router();

router.post('/uploadProduct/:productId', uploadFile.single('image'), async (req, res) => {
  try {
    const { productId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Không có ảnh được tải lên.' });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại.' });
    }
    product.thumnails = req.file.path;
    await product.save();
    return res.status(200).json({ success: true, message: 'Tải lên ảnh thành công.', imageUrl: req.file.path });
  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).json({ success: false, error: 'Lỗi trong quá trình tải lên.' });
  }
});
router.post('/uploadUser/:userID', uploadFile.single('image'), async (req, res) => {
    try {
      const { userID } = req.params;
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'Không có ảnh được tải lên.' });
      }
      const user = await User.findById(userID);
  console.log('console',user)
      if (!user) {
        return res.status(404).json({ success: false, error: 'Người dùng không tồn tại.' });
      }
      user.avatar = req.file.path;
      await user.save();
      return res.status(200).json({ success: true, message: 'Tải lên ảnh thành công.', imageUrl: req.file.path });
    } catch (error) {
      console.error('Lỗi:', error);
      return res.status(500).json({ success: false, error: 'Lỗi trong quá trình tải lên.' });
    }
  });

module.exports = router;
