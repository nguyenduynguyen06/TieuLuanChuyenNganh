import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { message, Upload, Collapse, Table, Modal } from 'antd';
import { Button, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 3,
        },
        sm: {
            span: 5,
        },
    },
    wrapperCol: {
        xs: {
            span: 30,
        },
        sm: {
            span: 29,
        },
    },
};

const NewProduct = ({ closeModal }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [initialProperty, setInitialProperty] = useState({ label: '', value: '' });
    const [formProperties, setFormProperties] = useState([]);

    const headers = {
        token: `Bearers ${user.access_token}`,
    };

    const props = {
        name: 'image',
        action: `${process.env.REACT_APP_API_URL}/upload`,
        headers: {
            authorization: 'authorization-text',
        },
        accept: '.jpg, .jpeg, .png',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const uploadedFilePaths = info.file.response.imageUrl
                console.log('uploadedFilePaths', uploadedFilePaths)
                form.setFieldsValue({ picture: uploadedFilePaths });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };


    const handleCloseModal = () => {
        closeModal();
        form.resetFields();
        setFormProperties([]);
        setInitialProperty({ label: '', value: '' });
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/category/addCategory`, values, { headers });
            if (response.data.success) {
                message.success('Thêm danh mục thành công');
                form.resetFields();
            } else {
                message.error(response.data.error);
            }
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
            message.error('Đã xảy ra lỗi khi thêm danh mục');
        }
    };


    return (
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            style={{
                width: "100%",
            }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Tên danh mục"
                rules={[
                    {
                        required: true,
                        message: 'Điền tên của danh mục',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="picture"
                label="Hình ảnh"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn ảnh',
                    },
                ]}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Ảnh</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Thêm danh mục
                    </Button>
                    <Button type="primary" size="large" danger onClick={handleCloseModal}>
                        Hủy bỏ
                    </Button>
                </div>
            </Form.Item>
        </Form>

    );
};
export default NewProduct;
