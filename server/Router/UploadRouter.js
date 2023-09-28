// routes/uploadRouter.js
const express = require('express');
const { uploadFile } = require('../controller/UploadFile');


const router = express.Router();

router.post('/upload', uploadFile);

module.exports = router;
