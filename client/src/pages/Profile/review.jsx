import { Button, Form, Rate, Upload, message } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from '@ant-design/icons'

const ReviewModal = ({ isVisible, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [form] = Form.useForm();

    const props = {
        name: 'images',
        action: `${process.env.REACT_APP_API_URL}/uploads`,
        headers: {
            authorization: 'authorization-text',
        },
        accept: '.jpg, .jpeg, .png',
        multiple: true,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const uploadedFilePaths = info.fileList
                    .filter((file) => file.status === 'done')
                    .map((file) => file.response.imageUrls);
                const allImageUrls = [].concat(...uploadedFilePaths);
                console.log('')
                form.setFieldsValue({ thumnails: allImageUrls });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    const handleRatingChange = (value) => {
        setRating(value);
      };
        
    return (
        <div style={{ boxShadow: 'none' }}>
            <div className="modal-content" style={{ padding: '10px' }}>
                <h4 style={{textAlign: 'center'}}>Đánh giá sản phẩm</h4>
                <label>Đánh giá:</label>
                <Rate value={rating} onChange={handleRatingChange} />
                <br />

                <label>Nội dung đánh giá:</label>
                <textarea
                    style={{ padding: '10px' }}
                    className='textarea'
                    placeholder='Đánh giá của bạn'
                    name='content'
                ></textarea>
                <br />

                <label>Hình ảnh:</label>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Ảnh</Button>
                </Upload>
                <br />
                <Button style={{background: '#8c52ff', color:'#fff'}}>Gửi đánh giá</Button>
            </div>
        </div>
    );
};

export default ReviewModal;
