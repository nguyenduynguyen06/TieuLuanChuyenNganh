import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
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

const NewBrand = ({ closeModal }) => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [formProperties, setFormProperties] = useState([]);
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCloseModal = () => {
    closeModal();
    form.resetFields();
    setFormProperties([]);
  };
  const onFinish = async (values) => {
    const headers = {
      token: `Bearers ${user.access_token}`,
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/brand/addBrand`, values, { headers });
      if (response.data.success) {
        message.success('Thêm thương hiệu thành công');
        form.resetFields();
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error('Lỗi khi thêm thương hiệu:', error);
      message.error('Đã xảy ra lỗi khi thêm thương hiệu');
    }
  };

  const data = Object.keys(formProperties).map((label, index) => ({
    key: index,
    label: label,
    value: formProperties[label],
  }));

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
            required: true,
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
            required: true,
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
            required: true,
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
            required: true,
            message: 'Điền tên quốc gia',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item >
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
          <Button type="primary" size="large" htmlType="submit">
            Thêm thương hiệu
          </Button>
          <Button type="primary" size="large" danger onClick={handleCloseModal}>
            Huỷ bỏ
          </Button>
        </div>
      </Form.Item>

    </Form>

  );
};
export default NewBrand;
