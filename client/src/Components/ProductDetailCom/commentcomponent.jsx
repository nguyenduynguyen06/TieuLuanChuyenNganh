import { Row } from 'antd';
import React, { useState } from 'react';
import { WrapperButton, WrapperComment, WrapperInfo, WrapperTextBox } from './style';
import { LikeFilled, DislikeFilled, MessageFilled } from '@ant-design/icons'

const Comment = () => {
  const [commentText, setCommentText] = useState(''); // Trạng thái cho nội dung bình luận
  const [author, setAuthor] = useState(''); // Trạng thái cho tên tác giả
  const [isAnonymous, setIsAnonymous] = useState(false); // Trạng thái cho ẩn danh
  const [comments, setComments] = useState([]); // Trạng thái cho danh sách các bình luận

  // Hàm xử lý khi thay đổi nội dung bình luận
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  // Hàm xử lý khi thay đổi tên tác giả
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  // Hàm xử lý khi thay đổi trạng thái ẩn danh
  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  // Hàm xử lý khi người dùng gửi bình luận
  const handleCommentSubmit = () => {
    if (commentText && author) {
      // Tạo một bình luận mới
      const newComment = {
        author: isAnonymous ? 'Người dùng ẩn danh' : author,
        text: commentText,
        likes: 0,
        dislikes: 0,
        replies: [],
      };

      // Thêm bình luận mới vào danh sách bình luận
      setComments([...comments, newComment]);

      // Xóa trạng thái nội dung bình luận và tên tác giả
      setCommentText('');
      setAuthor('');
    }
  };

  const commentTem = {
    author: 'Quang Dương',
    text: 'Sản phẩm như hạch, có vậy cũng bán, cho không cũng không thèm lấy!!',
    likes: 111,
    dislikes: 0,
    replies: [],
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '4px' }} >
      <h2>Bình luận</h2>
      <Row style={{ display: 'flex' }}>
        <WrapperTextBox span={22}>
          <textarea className='textbox'
            rows="2"
            cols="165"
            placeholder="Nhập bình luận của bạn..."
            value={commentText}
            onChange={handleCommentChange}
            style={{ width: '100%', marginRight: '10px' }}
          />
        </WrapperTextBox>
        <WrapperButton span={2}>
          <button className="btn" onClick={handleCommentSubmit} style={{ marginLeft: "10px", minWidth: '100%' }}>Gửi</button>
        </WrapperButton>
      </Row>
      <br></br>
      <WrapperInfo style={{ display: 'flex', alignContent: 'space-between' }}>
        <input className='nameinput'
          type="text"
          placeholder="Tên của bạn"
          value={author}
          onChange={handleAuthorChange}
        />
        <label className='label'>
          Đăng ẩn danh:
          <input className='checkbox'
            type="checkbox"
            checked={isAnonymous}
            onChange={handleAnonymousChange}
          />
        </label>
      </WrapperInfo>
      <br></br>


      {/* Hiển thị danh sách bình luận */}
      <WrapperComment >
        {/* {comments.map((comment, index) => (
          <div key={index}> */}
        <div className='singlecmt'>
          <p className='name'>{commentTem.author}</p>
          <p className='content'>{commentTem.text}</p>
          <button className='like'>
            <LikeFilled /> ({commentTem.likes})
          </button>
          <button className='dislike'>
            <DislikeFilled /> ({commentTem.dislikes})
          </button>
          <button className='rep'>
            <MessageFilled /> Trả lời
          </button>
        </div>
        {/* ))} */}
      </WrapperComment>
    </div>
  );
};

export default Comment;
