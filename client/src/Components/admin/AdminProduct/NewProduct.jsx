import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { message, Upload, Collapse, Table, Modal } from 'antd';
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
import zIndex from '@mui/material/styles/zIndex';

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

const NewProduct = ({ closeModal }) => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [initialProperty, setInitialProperty] = useState({ label: '', value: '' });
  const [formProperties, setFormProperties] = useState([]);
  const { nameCategory } = useParams();
  const [data1, setData] = useState([]);

  const props = (attrFieldKey, variantKey) => ({
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
        const uploadedFilePath = info.file.response.imageUrl;
        if (typeof uploadedFilePath === 'string') {
          form.setFieldsValue({
            variants: form.getFieldValue('variants').map((variant, index) => {
              if (index === variantKey) {
                return {
                  ...variant,
                  attributes: variant.attributes.map((attribute, attrIndex) => {
                    if (attrIndex === attrFieldKey) {
                      return {
                        ...attribute,
                        pictures: uploadedFilePath
                      };
                    }
                    return attribute;
                  })
                };
              }
              return variant;
            })
          });
        } else {
          console.error('uploadedFilePath is not a string:', uploadedFilePath);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  });
  const propss = {
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
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => {
    setCentredModal(true);
  };
  const closeModal1 = () => {
    setCentredModal(false);
  };
  const closeModal2 = () => {
    setCentredModal(false);
    setFormProperties([])
    setInitialProperty({ label: '', value: '' });
  };
  useEffect(() => {
    if (categories) {
      const category = categories.find((cat) => cat.name === nameCategory);
      if (category) {
        const categoryId = category._id;
        fetchBrandsByCategory(categoryId);
      }
    }
  }, [categories, nameCategory]);


  const fetchBrandsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
      setBrands(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thương hiệu theo danh mục:', error);
    }
  };

  const handleAddProperty = () => {
    if (initialProperty.label && initialProperty.value) {
      setFormProperties({
        ...formProperties,
        [initialProperty.label]: initialProperty.value
      });
    }
    setInitialProperty({ label: '', value: '' });
    };

  const handleRemoveProperty = (labelToRemove) => {
    const updatedProperties = { ...formProperties };
    delete updatedProperties[labelToRemove];
    setFormProperties(updatedProperties);
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

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value);

    try {
      const category = categories.find((cat) => cat.name === value);
      if (category) {
        const categoryId = category._id;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
        setBrands(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching brands for the selected category:', error);
    }
  };
  const handleCloseModal = () => {
    closeModal();
    form.resetFields();
    setFormProperties([]);
    setInitialProperty({ label: '', value: '' });
  };
  const onFinish = async (values) => {
    const headers = {
      token: `Bearers ${user.access_token}`,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addProduct`, {
        ...values, properties: formProperties
      }, { headers }
      );

      if (response.data.success) {
        message.success('Thêm sản phẩm thành công');
        form.resetFields();
        setSelectedCategory(null);
        setFormProperties([]);
      } else {
        message.error('Thêm sản phẩm thất bại: ' + response.data.error);
      }
    } catch (error) {
      message.error('Thêm sản phẩm thất bại: ' + error.response.data.error);
    }
};
  const columns = [
    {
      title: 'Thuộc tính',
      dataIndex: 'label',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      render: (text, record) => (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleRemoveProperty(record.label)}>Huỷ bỏ</Button>
      ),
    },
  ];


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
        width: "90%",
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
        <Input />
      </Form.Item>

      <Form.Item
        name="warrantyPeriod"
        label="Bảo hành/tháng"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền thời gian bảo hành',
          },
        ]}
      >
        <Input type="number" />
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
        <Select placeholder="Chọn danh mục" onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
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
        name="releaseTime"
        label="Ngày ra mắt"
        rules={[
          {
            required: true,
            message: 'Chọn ngày ra mắt',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="include"
        label="Sản phẩm gồm"
      >
        <Input />
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
        <Upload {...propss}>
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
      <Form.Item name="variants" label="Biến thể">
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Collapse key={key}>
                  <Collapse.Panel header={`Variant ${key + 1}`} key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'memory']}
                      fieldKey={[fieldKey, 'memory']}
                      label="Bộ nhớ"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'imPrice']}
                      fieldKey={[fieldKey, 'imPrice']}
                      label="Giá nhập"
                    >
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'newPrice']}
                      fieldKey={[fieldKey, 'newPrice']}
                      label="Giá bán"
                    >
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.List
                      name={[name, 'attributes']}
                      {...restField}
                    >
                      {(attributeFields, attributeOperations) => (
                        <>
                          {attributeFields.map(({ key: attrKey, name: attrName, fieldKey: attrFieldKey, ...attrRestField }) => (
                            <Collapse key={attrKey}>
                              <Collapse.Panel header={`Thuộc tính ${attrKey + 1}`} key={attrKey}>
                                <Form.Item
                                  label="Màu sắc"
                                  name={[attrName, 'color']}
                                  fieldKey={[attrFieldKey, 'color']}
                                  {...attrRestField}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng điền màu sắc!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Số lượng"
                                  name={[attrName, 'quantity']}
                                  fieldKey={[attrFieldKey, 'quantity']}
                                  {...attrRestField}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng điền số lượng!',
                                    },
                                  ]}
                                >
                                  <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                  label="Hình ảnh"
                                  name={[attrName, 'pictures']}
                                  fieldKey={[attrFieldKey, 'pictures']}
                                  {...attrRestField}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng chọn ảnh',
                                    },
                                  ]}
                                >
                                  <Upload {...props(attrFieldKey, key)}>
                                    <Button icon={<UploadOutlined />}>Ảnh</Button>
                                  </Upload>
                                </Form.Item>
                                <Form.Item
                                  label="SKU"
                                  name={[attrName, 'sku']}
                                  fieldKey={[attrFieldKey, 'sku']}
                                  {...attrRestField}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng điền SKU!',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                            
                                <MinusCircleOutlined onClick={() => { attributeOperations.remove(attrName); }} />
                              </Collapse.Panel>
                            </Collapse>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => { attributeOperations.add(); }}
                              icon={<PlusOutlined />}
                            >
                              Thêm thuộc tính của biến thể
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <MinusCircleOutlined onClick={() => { remove(name); }} />
                  </Collapse.Panel>
                </Collapse>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm variant
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="attributes" label="Thuộc tính">

        <Button onClick={toggleOpen}>Thêm thuộc tính</Button>
      </Form.Item>
      <Form.Item >
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
          <Button type="primary" size="large" htmlType="submit">
            Thêm sản phẩm
          </Button>
          <Button type="primary" size="large" danger onClick={handleCloseModal}>
            Huỷ bỏ
          </Button>
        </div>
      </Form.Item>
      <>
        <Modal
          visible={centredModal}
          title="Thêm thuộc tính cho sản phẩm"
          footer={null}

          closable={false}
          width={1400}
        >
          <div style={{ fontWeight: '500' }}>Bảng thuộc tính đã thêm</div>
          <Table columns={columns} dataSource={data} />
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            Thuộc tính :
            <Input allowClear value={initialProperty.label} onChange={(e) => setInitialProperty({ ...initialProperty, label: e.target.value })} placeholder="Thuộc tính" />
            Giá trị :
            <ReactQuill
              value={initialProperty.value}
              onChange={(content) => setInitialProperty({ ...initialProperty, value: content })}
              placeholder="Giá trị"
            />
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'end', marginTop: '10px' }}>
            <Button onClick={handleAddProperty} icon={<PlusOutlined />}>
              Thêm thuộc tính
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'end', marginTop: '10px' }}>
            <Button onClick={closeModal1} >
              Xác nhận
            </Button>
            <Button danger onClick={closeModal2} >
              Huỷ bỏ
            </Button>
          </div>
        </Modal>
      </>
    </Form>

  );
};
export default NewProduct;
