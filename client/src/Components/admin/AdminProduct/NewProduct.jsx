import React from 'react';
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
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
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
          <Option value="male">Iphone</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
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
        <Select placeholder="Chọn danh mục">
          <Option value="male">Iphone</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

 
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProduct;