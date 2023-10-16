import React, { useState, useEffect } from "react";
import {  Switch, Table, Image, Upload, Button, message, Modal, Alert, Space, Form, Input} from 'antd';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";



const TableComment = () => {
    const user = useSelector((state)=> state.user)
    const [form] = Form.useForm();
    const [commentData, setcommentData] = useState([]); 
    const [currentCommentId, setCurrentCommentId] = useState(null);
    const [reply,setReply] = useState(false);
    const columns = [
      {
        title: 'Tên người bình luận',
        dataIndex: 'author',
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
      },
      {
        title: 'Sản phẩm',
        dataIndex: 'product',
        render: product => product?.name
      },
      {
        render: record => ( 
        <Space size="middle">
            <Button style={{backgroundColor: "#FF6A6A"}} onClick={() => handleDeleteComment(record._id)}>Xoá</Button>
            <Button style={{backgroundColor: "#97FFFF"}} onClick={() => handleCheckcomment(record._id)}>Duyệt</Button>
            <Button style={{backgroundColor: "#00FFFF"}} onClick={() => {      
                setCurrentCommentId(record._id)
                setReply(true);
            }}>Trả lời</Button>
                 <Modal
          title="Trả lời theo nội dung"
          visible={reply}
          onOk={() => {
            form
            .validateFields()
            .then((values) => {
              Reply(currentCommentId,values)
              setReply(false);
            })
            .catch((errorInfo) => {
              console.error('Validation failed:', errorInfo);
            });
          }}
          onCancel={() => setReply(false)} 
        >
         <Form
                {...formItemLayout}
                form={form}
                style={{
                  maxWidth: 600,
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="content"
                  label="Nội dung"
                >
                    <Input />
                </Form.Item>
        </Form>
        </Modal>
        </Space>)
      },
    ];
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };
    const handleDeleteComment = (commentId) => {
        const headers = {
            token: `Bearers ${user.access_token}`,
        }; 
        axios
          .delete(`${process.env.REACT_APP_API_URL}/comment/delete/${commentId}` , { headers })
          .then((response) => {
            if (response.data.success) {
              const updatedData = commentData.filter((item) => item._id !== commentId);
              setcommentData(updatedData);
              message.success('Xóa bình luận thành công');
            } else {
              message.error('Lỗi khi xóa bình luận');
            }
          })
          .catch((error) => {
            console.error('Lỗi khi gọi API xóa bình luận: ', error);
            message.error('Lỗi khi xóa bình luận');
          });
      };
      const Reply = (commentId,values) => {
        const updatedValues = { ...values, userName: user.fullName };
        axios
          .post(`${process.env.REACT_APP_API_URL}/comment/addReply/${commentId}`,updatedValues)
          .then((response) => {
            if (response.data.success) {
              message.success('Trả lời thành công');
            } else {
              message.error('Trả lời lỗi');
            }
          })
          .catch((error) => {
            message.error('Trả lời lỗi');
          });
      };
      const handleCheckcomment = (commentId) => {
        axios
          .put(`${process.env.REACT_APP_API_URL}/comment/check/${commentId}` )
          .then((response) => {
            if (response.data.success) {
                axios.get(`${process.env.REACT_APP_API_URL}/comment/getAll`)
                .then((response) => {
                    const filteredComments = response.data.data.filter(comment => comment.check === false);
                    setcommentData(filteredComments);
                })
              message.success('Duyệt thành công');
            } else {
              message.error('Lỗi khi duyệt');
            }
          })
          .catch((error) => {

            message.error('Lỗi khi duyệt');
          });
      };
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/comment/getAll`)
        .then((response) => {
            const filteredComments = response.data.data.filter(comment => comment.check === false);
            setcommentData(filteredComments);
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API: ', error);
        });
    }, []);
    return (
      <div>
        <Table columns={columns} dataSource={commentData} /> 
      </div>
    );
  };
  
  export default TableComment;