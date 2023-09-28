
const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname,'..', 'images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      console.log('Lỗi khi tải lên tệp:', err);
      return res.status(500).json({ error: 'Lỗi khi tải lên tệp' });
    }
    const { originalname } = req.file;
    res.json({ message: 'Tệp đã được tải lên thành công', filename: originalname });
  });
};

module.exports = { uploadFile };
