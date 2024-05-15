import React, { useEffect,useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Select, Upload } from 'antd';
import {
    Button,
    Form,
    Input,
} from 'antd';
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

const EditBrand = ({ closeModal, brandId }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
          .then((response) => {
            setCategories(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
      }, []);
    
    useEffect(() => {
        if (brandId) {
            axios.get(`${process.env.REACT_APP_API_URL}/brand/getAll`)
                .then((response) => {
                    const brandData = response.data.data;
                    form.setFieldsValue({
                        name: brandData.name,
                    });
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, [brandId, form]);



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

    const onFinish = (values) => {
        const headers = {
            token: `Bearer ${user.access_token}`,
        };
        axios.put(`${process.env.REACT_APP_API_URL}/brand/updateBrand/${brandId}`, values, { headers })
            .then((response) => {
                message.success('Chỉnh sửa thương hiệu thành công');
                closeModal();
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật thương hiệu: ', error);
            });
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
                label="Tên thương hiệu"
                rules={[
                    {
                        required: false,
                        message: 'Điền tên thương hiệu',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="categoryName"
                label="Danh mục"
                rules={[
                    {
                        required: false,
                        message: 'Chọn danh mục',
                    },
                ]}
            >
                <Select placeholder="Chọn danh mục" >
                    {categories.map((category) => (
                        <Option key={category.id} value={category.name}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="picture"
                label="Hình ảnh"
                rules={[
                    {
                        required: false,
                        message: 'Vui lòng chọn ảnh',
                    },
                ]}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Ảnh</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                name="country"
                label="Quốc gia"
                rules={[
                    {
                        required: false,
                        message: 'Điền tên quốc gia',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item >
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Sửa thương hiệu
                    </Button>
                    <Button type="primary" size="large" danger onClick={closeModal}>
                        Huỷ bỏ
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default EditBrand;
