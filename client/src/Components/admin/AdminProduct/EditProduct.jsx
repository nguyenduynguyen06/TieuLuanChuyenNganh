import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload} from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
} from 'antd';
import moment from 'moment';
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

const EditProduct = ({ closeModal, productId }) => {
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [properties, setProperties] = useState({});
    const [newProperty, setNewProperty] = useState({ label: '', value: '' });
    const [selectedProperty, setSelectedProperty] = useState(null);
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
        if (productId) {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getProduct/${productId}`)
                .then((response) => {
                    const productData = response.data.data;
                    const productDateParts = productData.releaseTime.split('/');
                    const releaseTime = moment(`${productDateParts[2]}-${productDateParts[1]}-${productDateParts[0]}`, 'YYYY-MM-DD');
                    handleCategoryChange(productData.category.name);
                    form.setFieldsValue({
                        name: productData.name,
                        warrantyPeriod: productData.warrantyPeriod,
                        categoryName: productData.category.name,
                        brandName: productData.brand.name,
                        include: productData.include,
                        releaseTime,
                        thumnails: productData.thumnails,
                        desc: productData.desc,
                        promotion: productData.promotion,
                    });
                    setProperties(productData.properties || {});
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [productId, form]);
    const handlePropertyLabelChange = (key, value) => {
        const updatedProperties = { ...properties, [value]: properties[key] };
        delete updatedProperties[key];
        setProperties(updatedProperties);
    };

    const handlePropertyValueChange = (key, value) => {
        setProperties({ ...properties, [key]: value });
    };

    const handleEditProperty = (key) => {
        setSelectedProperty(key);
    };
    const handleRemoveProperty = (key) => {
        const updatedProperties = { ...properties };
        delete updatedProperties[key];
        setProperties(updatedProperties);
    };
    const handleAddNewProperty = () => {
        if (newProperty.label && newProperty.value) {
            setProperties({
                ...properties,
                [newProperty.label]: newProperty.value
            });
            setNewProperty({ label: '', value: '' });
        }
    };

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
    const handleCategoryChange = async (value) => {
        try {
            const category = categories.find((cat) => cat.name === value);
            if (category) {
                const categoryId = category._id;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
                setBrands([...response.data.data]);
            }
        } catch (error) {
            console.error('Error fetching brands for the selected category:', error);
        }
    };

    const onFinish = (values) => {
        const headers = {
            token: `Bearer ${user.access_token}`,
        };
        const editedValues = { ...values, properties };
        axios
            .put(`${process.env.REACT_APP_API_URL}/product/editProduct/${productId}`, editedValues, { headers })
            .then((response) => {
                message.success('Sửa sản phẩm thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật sản phẩm: ', error);
            });
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
                        message: 'Vui lòng điền mô tả',
                    },
                ]}
            >
                <ReactQuill
                    theme="snow"
                    placeholder="Nhập mô tả ở đây..."
                />
            </Form.Item>
            <Form.Item
                name="promotion"
                label="Chương trình khuyến mãi"
            >
                <ReactQuill
                    theme="snow"
                    placeholder="Nhập khuyến mãi ở đây..."
                />
            </Form.Item>
            <Form.Item label="Thuộc tính">
                {Object.keys(properties).map((key, index) => (
                    <div key={index} style={{ marginBottom: 16 }}>
                        <Input
                            value={key}
                            onChange={(e) => handlePropertyLabelChange(key, e.target.value)}
                            style={{ width: '40%', marginRight: 8 }}
                            key={`label-${index}`}
                        />
                        <Button type="link" onClick={() => handleRemoveProperty(key)}>Xóa thuộc tính</Button>
                        <Button type="link" onClick={() => handleEditProperty(key)}>Chỉnh sửa thuộc tính</Button>
                        {selectedProperty === key && (
                            <ReactQuill
                                value={properties[key]}
                                onChange={(value) => handlePropertyValueChange(key, value)}
                                placeholder={`Nhập giá trị cho thuộc tính "${properties[key]}"`}
                                style={{ width: '100%', marginTop: 8 }}
                                key={`value-${index}`}
                            />
                        )}
                    </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                    <Input
                        value={newProperty.label}
                        onChange={(e) => setNewProperty({ ...newProperty, label: e.target.value })}
                        style={{ width: '40%', marginRight: 8 }}
                        placeholder="Nhập nhãn thuộc tính"
                    />
                    <ReactQuill
                        value={newProperty.value}
                        onChange={(value) => setNewProperty({ ...newProperty, value })}
                        placeholder="Nhập giá trị thuộc tính"
                        style={{ width: '100%', marginTop: 8 }}
                    />
                    <Button type="primary" onClick={handleAddNewProperty}>Thêm thuộc tính</Button>
                </div>
            </Form.Item>
            <Form.Item >
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'end' }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Sửa sản phẩm
                    </Button>
                    <Button type="primary" size="large" danger onClick={closeModal}>
                        Huỷ bỏ
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default EditProduct;
