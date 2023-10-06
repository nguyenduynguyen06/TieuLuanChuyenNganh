import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import {  message, Upload } from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
const { Option } = Select;
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 8,
    },
  },
};
const NewProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formProperties, setFormProperties] = useState([]);
  const props = {
  name: 'image',
  action: `${process.env.REACT_APP_API_URL}/upload`,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);

  
      const uploadedFilePath = info.file.response.imageUrl; 
      form.setFieldsValue({ thumnails: uploadedFilePath }); 
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


  const handlePropertyChange = (propertyKey, value) => {
    setFormProperties({
      ...formProperties,
      [propertyKey]: value,
    });
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
    axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`)
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  }, []);


  const renderAttributes = () => {

      if (selectedCategory === 'Điện thoại') {
        return (
          <>
           <Form.Item
  label="Màn hình"
  name="manHinh"
  rules={[
    { required: true, message: 'Vui lòng điền Màn hình' },
  ]}
>
  <Input onChange={(e) => handlePropertyChange('Màn hình', e.target.value)} />
</Form.Item>

<Form.Item
  label="Hệ điều hành"
  name="heDieuHanh"
  rules={[
    { required: true, message: 'Vui lòng điền Hệ điều hành' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('Hệ điều hành', e.target.value)} />
</Form.Item>

<Form.Item
  label="Camera sau"
  name="cameraSau"
  rules={[
    { required: true, message: 'Vui lòng điền Camera sau' },
  ]}
>
  <Input onChange={(e) => handlePropertyChange('Camera sau', e.target.value)} />
</Form.Item>

<Form.Item
  label="Camera trước"
  name="cameraTruoc"
  rules={[
    { required: true, message: 'Vui lòng điền Camera trước' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('Camera trước', e.target.value)} />
</Form.Item>

<Form.Item
  label="Chip"
  name="chip"
  rules={[
    { required: true, message: 'Vui lòng điền Chip' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('Chip', e.target.value)} />
</Form.Item>

<Form.Item
  label="RAM"
  name="ram"
  rules={[
    { required: true, message: 'Vui lòng điền RAM' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('RAM', e.target.value)} />
</Form.Item>

<Form.Item
  label="SIM"
  name="sim"
  rules={[
    { required: true, message: 'Vui lòng điền SIM' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('SIM', e.target.value)} />
</Form.Item>

<Form.Item
  label="Pin, Sạc"
  name="pinSac"
  rules={[
    { required: true, message: 'Vui lòng điền Pin, Sạc' },

  ]}
>
  <Input onChange={(e) => handlePropertyChange('Pin, Sạc', e.target.value)} />
</Form.Item>

          </>
        );
      } else if (selectedCategory === 'Ốp lưng') {
        return (
          <>
            <Form.Item
              label="Loại ốp lưng"
              name="caseType"
            >
              <Input />
            </Form.Item>
          </>
        );
      } else {
        return null;
      }
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const onFinish = async (values) => {
    
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addProduct`,{
        ...values, properties: formProperties}
      );  
      form.resetFields();
      setSelectedCategory(null);
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
            message: 'Điền tên của sản phẩm',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="warrantyPeriod"
        label="Bảo hành"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền thời gian bảo hành',
          },
        ]}
      >
          <Input/>
      </Form.Item>

      <Form.Item
        name="brandName"
        label="Thương hiệu"
        rules={[
          {
            required: true,
            message: 'Chọn thương hiệu',
          },
        ]}
      >
        <Select placeholder="Chọn thương hiệu">
          {brands.map((brand) => (
            <Option key={brand.id} value={brand.name}>
              {brand.name}
            </Option>
          ))}
        </Select>
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
       <Select placeholder="Chọn danh mục"  onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="thumnails"
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
        name="desc"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền mô tả bảo hành',
          },
        ]}
      >
        <ReactQuill
          theme="snow" 
          placeholder="Nhập mô tả ở đây..." 
        />
      </Form.Item>
      {renderAttributes()}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProduct;