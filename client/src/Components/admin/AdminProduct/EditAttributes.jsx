import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { message, Upload, Collapse, Table } from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Alert, InputNumber
} from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import SkeletonButton from 'antd/es/skeleton/Button';

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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 21,
        },
    },
};

const EditAttributes = ({ closeModal, attributesId }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const props = ({
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
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            const uploadedFilePath = info.file.response.imageUrl;
            if (typeof uploadedFilePath === 'string') {
              form.setFieldsValue({ pictures: uploadedFilePath });
            } else {
              console.error('uploadedFilePath is not a string:', uploadedFilePath);
            }
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
      });
      
    useEffect(() => {
        if (attributesId) {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getDetailsAttributes/${attributesId}`)
                .then((response) => {
                    const attributesData = response.data.data;
                    form.setFieldsValue({
                        sku: attributesData.sku,
                        color: attributesData.color,
                        quantity: attributesData.quantity
                    });
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [attributesId, form]);
    const onFinish = (values) => {
        const headers = {
            token: `Bearer ${user.access_token}`,
        };
        try {
            axios.put(`${process.env.REACT_APP_API_URL}/product/editAttributes/${attributesId}`, values, { headers });
            message.success('Sửa thuộc tính thành công')
        } catch (error) {
            message.error('Sửa thuộc tính thất bại', error)
        }
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            style={{
                width: "90%",
            }}
            scrollToFirstError
        >
            <Form.Item
                name="sku"
                label="Mã sản phẩm"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="color"
                label="Màu sắc"
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Số lượng"
            >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="pictures"
                label="Hình ảnh"
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Ảnh</Button>
                </Upload>
            </Form.Item>
            <Form.Item >
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Sửa thuộc tính
                    </Button>
                    <Button type="primary" size="large" danger onClick={closeModal}>
                        Huỷ bỏ
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default EditAttributes;
