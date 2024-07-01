import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, DatePicker, message, Upload, Modal, Slider } from 'antd';
import { useSelector } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 3 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 30 },
        sm: { span: 29 },
    },
};

const NewNews = ({ closeModal }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [preview, setPreview] = useState(null);
    const [cropModalVisible, setCropModalVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [scale, setScale] = useState(1);
    const [uploading, setUploading] = useState(false);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    const headers = {
        token: `Bearers ${user.access_token}`,
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAdmin`, { headers })
            .then((response) => {
                const filteredUsers = response.data.data.filter(user => user.role_id === 1);
                setUsers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleBeforeUpload = (file) => {
        if (checkFile(file)) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setPreview(reader.result));
            reader.readAsDataURL(file);
            setFile(file);
            setCropModalVisible(true);
        }
        return false; // Prevent immediate upload
    };

    const checkFile = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên tệp tin JPG/PNG!');
        }
        return isJpgOrPng;
    };

    const handleCrop = async () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
            const blob = await (await fetch(canvas)).blob();
            const formData = new FormData();
            formData.append('image', blob, file.name);

            setUploading(true);

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    message.success('Tải ảnh lên thành công!');
                    setUploadedFileName(file.name); // Set the uploaded file name
                    form.setFieldsValue({ image: response.data.imageUrl });
                    setCropModalVisible(false);
                } else {
                    message.error('Tải ảnh lên thất bại.');
                }
            } catch (error) {
                message.error('Tải ảnh lên thất bại.');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleChangeImage = () => {
        setCropModalVisible(false);
        setTimeout(() => {
            fileInputRef.current.click();
        }, 100);
    };

    const handleCloseModal = () => {
        closeModal();
        form.resetFields();
        setUploadedFileName(null);
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/news/addNews`, values, { headers });
            if (response.data.success) {
                message.success('Thêm tin tức thành công');
                form.resetFields();
                closeModal();
            } else {
                message.error(response.data.error);
            }
        } catch (error) {
            console.error('Lỗi khi thêm tin tức:', error);
            message.error('Đã xảy ra lỗi khi thêm tin tức');
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            style={{ width: "100%" }}
            scrollToFirstError
        >
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Hãy điền tiêu đề' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="image"
                label="Hình ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
            >
                <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
                {uploadedFileName && <div>Tệp đã tải lên: {uploadedFileName}</div>}
            </Form.Item>

            <Form.Item
                name="content"
                label="Nội dung"
                rules={[{ required: true, message: 'Vui lòng điền nội dung' }]}
            >
                <ReactQuill theme="snow" placeholder="Nhập nội dung ở đây..." />
            </Form.Item>

            <Form.Item
                name="author"
                label="Tác giả"
                rules={[{ required: true, message: 'Vui lòng chọn tác giả' }]}
            >
                <Select placeholder="Chọn tác giả">
                    {users.map((user) => (
                        <Option key={user.id} value={user.fullName}>
                            {user.fullName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="publishedDate"
                label="Ngày phát hành"
                rules={[{ required: true, message: 'Chọn ngày phát hành' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Thêm tin tức
                    </Button>
                    <Button type="primary" size="large" danger onClick={handleCloseModal}>
                        Hủy bỏ
                    </Button>
                </div>
            </Form.Item>

            <Modal
                title="Thêm ảnh nền tin tức"
                width={700}
                maskClosable={false}
                visible={cropModalVisible}
                onCancel={() => setCropModalVisible(false)}
                footer={[
                    <Button key="change" onClick={handleChangeImage}>
                        Đổi ảnh khác
                    </Button>,
                    <Button key="cancel" onClick={() => setCropModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleCrop} style={{ backgroundColor: '#C13346', borderColor: '#C13346', color: '#fff' }} disabled={uploading}>
                        {uploading ? 'Đang tải lên...' : 'Tải lên'}
                    </Button>,
                ]}
            >
                {preview && (
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <AvatarEditor
                                ref={editorRef}
                                image={preview}
                                width={600}
                                height={337.5}
                                border={10}
                                scale={scale}
                                rotate={0}
                            />
                        </div>
                        <Slider
                            min={1}
                            max={10}
                            step={0.1}
                            value={scale}
                            onChange={(value) => setScale(value)}
                        />
                    </div>
                )}
            </Modal>

            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleBeforeUpload(e.target.files[0])} style={{ display: 'none' }} />
        </Form>
    );
};

export default NewNews;
