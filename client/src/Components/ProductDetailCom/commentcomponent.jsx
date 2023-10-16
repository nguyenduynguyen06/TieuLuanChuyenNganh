import { Input, Row } from 'antd';
import React, { useState } from 'react';
import { WrapperButton, WrapperComment, WrapperCommentNew, WrapperInfo, WrapperTextBox } from './style';
import { LikeFilled, DislikeFilled, MessageFilled, SendOutlined } from '@ant-design/icons'

const Comment = () => {
  const [commentText, setCommentText] = useState(''); 
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]); 
  const [showNameInput, setShowNameInput] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);


  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };


  const handleCommentSubmit = () => {
    if (commentText && author) {
 
      const newComment = {
        author:  'Người dùng ẩn danh',
        text: commentText,
        likes: 0,
        dislikes: 0,
        replies: [],
      };

     
      setComments([...comments, newComment]);


      setCommentText('');
      setAuthor('');
    }
  };
  return (
    <WrapperCommentNew style={{ width: '65%' }}>
      <div className='comment-container'>
        <div className='comment-form'>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ff3300'}}>Hỏi và đáp</p>
          {showNameInput && (
              <Input
                type="text"
                className='name-input'
                placeholder='Nhập tên'
                style={{width: '200px', height: '50px'}}
              />
            )}
          <div className='comment-form-content'>
            <div className='textarea-comment'>
              <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/af808c10-144a-4f31-b08d-e2108b4481bc/d622juu-a6a55fc8-da00-46b5-ab1f-8a32e5d48e1d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FmODA4YzEwLTE0NGEtNGYzMS1iMDhkLWUyMTA4YjQ0ODFiY1wvZDYyMmp1dS1hNmE1NWZjOC1kYTAwLTQ2YjUtYWIxZi04YTMyZTVkNDhlMWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OVHJUeMJdQ-ojp4LQwln1WdAjdmTAL4T8Q8d6ydk-qM' width={55} alt='icon' className='icon-img' />
              <textarea className='textarea' placeholder='Hãy để lại câu hỏi, chúng tôi sẽ giải đáp thắc mắc cho bạn!'
                          cols="120"  onClick={setShowNameInput}
                          ></textarea>
              <button className='btn-send'>
                <SendOutlined />Gửi
              </button>
            </div>
          </div>
          <br></br>
          {/* <WrapperInfo style={{ display: 'flex', alignContent: 'space-between' }}>
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
          </WrapperInfo> */}

        </div>
        <div className='block-comment-list'>
          <br></br>
          <div id className='list-comment'>
            <hr></hr>
            <div className='item-comment'>
              <div className='box-cmt'>
                <div className='cmt-inf'>
                  <div className='box-inf'>
                    <div className='box-inf-avt'>
                    <span>A</span>
                    </div>
                    <div className='box-inf-name'>Người dùng ẩn danh</div>
                  </div>
                </div>
                <div className='cmt-quest'>
                  <div className='content'>
                    <p>Có iPhone 15 Pro Max không sốp?</p>
                  </div>
                  <button className='btn-rep' onClick={setShowReplyForm}>
                    <MessageFilled />
                  </button>
                  {showReplyForm && (
        <div className='reply-form'>
          <Input
            type="text"
            className='name-input'
            placeholder='Nhập tên'
            style={{ width: '200px', height: '50px' }}
          />
          <div className='comment-form-content'>
            <div className='textarea-comment'>
              <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/af808c10-144a-4f31-b08d-e2108b4481bc/d622juu-a6a55fc8-da00-46b5-ab1f-8a32e5d48e1d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FmODA4YzEwLTE0NGEtNGYzMS1iMDhkLWUyMTA4YjQ0ODFiY1wvZDYyMmp1dS1hNmE1NWZjOC1kYTAwLTQ2YjUtYWIxZi04YTMyZTVkNDhlMWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OVHJUeMJdQ-ojp4LQwln1WdAjdmTAL4T8Q8d6ydk-qM' width={55} alt='icon' className='icon-img' />
              <textarea
                className='textarea'
                placeholder='Trả lời!'
                cols="120"
              ></textarea>
              <button className='btn-send'>
                <SendOutlined/> Gửi
              </button>
            </div>
          </div>
        </div>
      )}
                </div>
                <div className='cmt-rep'>
                  <div className='list-cmt-rep'>
                    <div className='item-cmt-rep'>
                      <div className='box-inf'>
                        <div className='box-inf-avt'>
                          <span>D</span>
                        </div>
                        <div className='box-inf-name'>Di Động Gen Z</div>
                      </div>
                      <div className='cmt-quest'>
                        <div className='content'>
                          <p>Chào bạn, có bạn nhé! Mua đi chờ chi!</p>
                        </div>
                        <button className='btn-rep'>
                          <MessageFilled />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperCommentNew>
  );
};

export default Comment;
