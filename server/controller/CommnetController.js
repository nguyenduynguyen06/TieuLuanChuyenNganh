const Comment = require('../Model/CommentModel');
const Product = require('../Model/ProductModel');
const User = require('../Model/UserModel');

const addComment = async (req, res) => {
    try {
      const { productName } = req.params;
      const product = await Product.findOne({ name: productName });
      const { userName, content } = req.body;
      let user
     user = await User.findOne({ fullName: userName });
      const comment = new Comment({
        product: product._id,
        user: user ? user._id : null,
        author: user ? user.fullName : userName,
        content,
      });
  
      await comment.save();
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  const addReply = async (req, res) => {
    try {
      const { userName, author, content } = req.body;
      const commentId = req.params.commentId;
      let user;
      
      if (userName) {
        user = await User.findOne({ fullName: userName });
      }
      
      const parentComment = await Comment.findById(commentId);
      
      if (!parentComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      const reply = new Comment({
        user: user ? user._id : null,
        author: author || (user ? user.fullName : userName),
        content,
      });
      
      parentComment.replies.push(reply);
      
      await reply.save(); // Lưu reply vào cơ sở dữ liệu trước
      await parentComment.save(); // Lưu parentComment sau khi đã thêm reply
      
      res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  
const getCommentsByProduct = async (req, res) => {
    try {
      const { productName } = req.params;
      const product = await Product.findOne({ name: productName });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm với tên này.' });
      }
  
      // Lấy các bình luận cho sản phẩm và nạp bình luận con
      const comments = await Comment.find({ product: product._id })
        .populate('user')
        .populate({
          path: 'replies',
          model: 'Comment', // Tên mô hình bình luận con
          populate: { path: 'user' }, // Nạp thông tin người dùng cho bình luận con
        });
  
      if (!comments) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bình luận nào cho sản phẩm này.' });
      }
  
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy danh sách bình luận.' });
    }
};

  
  

module.exports = {addComment, addReply,getCommentsByProduct}
