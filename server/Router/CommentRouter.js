const express = require('express');
const commentController = require('../controller/CommnetController');

const router = express.Router();

router.post('/addComment/:productName', commentController.addComment);
router.post('/addReply/:commentId', commentController.addReply);
router.get('/getCommentsByProduct/:productName', commentController.getCommentsByProduct)
module.exports = router;
