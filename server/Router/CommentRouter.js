const express = require('express');
const commentController = require('../controller/CommnetController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addComment/:productName', commentController.addComment);
router.post('/addReply/:commentId', commentController.addReply);
router.get('/getCommentsByProduct/:productName', commentController.getCommentsByProduct)
router.delete('/delete/:commentId', authMiddleware , commentController.deleteComment)
module.exports = router;
 