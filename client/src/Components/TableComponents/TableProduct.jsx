import React, { useState, useEffect } from "react";
import { Alert, InputNumber, Modal, Table } from 'antd';
import { Space } from 'antd';
import { Switch } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined,PlusOutlined,MinusCircleOutlined,AppstoreOutlined } from '@ant-design/icons';
import axios from "axios";
import Search from "antd/es/input/Search";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined } from '@ant-design/icons';
import {  message, Upload ,Collapse} from 'antd';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Image,
  List 
} from 'antd';


const TableProduct = () => {
  const props = (fieldKey) => ({
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
      const updatedAttributes = form.getFieldValue('attributes');
      updatedAttributes[fieldKey].pictures = uploadedFilePath;
      form.setFieldsValue({ attributes: updatedAttributes });
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
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([]); 
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
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Bảo hành/tháng',
      dataIndex: 'warrantyPeriod',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      render: brand => brand.name,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      render: category => category.name,
    },
    {
      title: "Hình ảnh hiển thị",
      dataIndex: "thumnails",
  
      render: thumbnails => (
        <div style={{
          display: "flex",
          flexWrap: "nowrap",  
          overflowX: "scroll",   
          maxWidth: "100%",
        }}>
          {thumbnails.map((imageUrl, index) => (
              <img
                src={imageUrl}
                alt={`Thumbnail ${index}`}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
          ))}
        </div>
      ),
    },    
    {
      title: 'Thao tác',
      render: (text, record) => (
        <Space size="middle">
          <a ><AppstoreAddOutlined onClick={() =>  {      
              setAddVariant(true);
            }} /></a>
          <a>
              <EditOutlined onClick={() =>  {      
              setUpdate(true);
            }} /> 
            </a>
          <a onClick={() => setDeleteModalVisible(true)}> <DeleteOutlined /></a>
                  <Modal
          title="Xác nhận xoá sản phẩm"
          visible={isDeleteModalVisible}
          onOk={() => {
            handleDeleteProduct(record._id);
            setDeleteModalVisible(false); 
          }}
          onCancel={() => setDeleteModalVisible(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
        </Modal>
         <Modal title="Sửa thông tin sản phẩm"
            visible={isUpdate}
            onOk={() => {
              form
              .validateFields()
              .then((values) => {
                handleSaveEdit(record._id, values);
                setUpdate(false);
              })
              .catch((errorInfo) => {
                console.error('Validation failed:', errorInfo);
              });
            }}
            onCancel={() => {
              setUpdate(false);
            }}
          >  
            <Alert
            message="Lưu ý: Sửa thuộc tính nào chỉ cần điền vào thuộc tính đó không cần điền tất cả"
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />

          <Form
                {...formItemLayout}
                form={form}
                style={{
                  maxWidth: 600,
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  name="warrantyPeriod"
                  label="Bảo hành/tháng"
              
                >
                    <Input type="number"/>
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
                  <DatePicker  />
                </Form.Item>
                <Form.Item
                  name="categoryName"
                  label="Danh mục"

                >
                <Select placeholder="Chọn danh mục">
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
                  >
                    <Upload {...propss}>
                       <Button icon={<UploadOutlined />}>Ảnh</Button>
                     </Upload>
               </Form.Item>
                <Form.Item
                  name="desc"
                  label="Mô tả"
                >
                  <ReactQuill
                    theme="snow" 
                    placeholder="Nhập mô tả ở đây..." 
                  />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
  title="Thêm biến thể"
  visible={isAddVariant}
  onOk={() => {
    form
      .validateFields()
      .then((values) => {
        addProductVariant(record._id, values);
        setAddVariant(false);
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  }}
  onCancel={() => {
    setAddVariant(false);
  }}
>
  <Form
    {...formItemLayout}
    form={form}
    style={{
      maxWidth: 600,
    }}
    scrollToFirstError
  >
    <Form.Item
      name="memory"
      label="Bộ nhớ"
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="imPrice"
      label="Giá nhập"
   
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item
      name="oldPrice"
      label="Giá cũ"
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item
      name="newPrice"
      label="Giá bán"
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
    <Form.List name="attributes">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, fieldKey, ...restField }) => (
        <Collapse key={key}>
          <Collapse.Panel header={`Thuộc tính ${key + 1}`} key={key}>
            <Form.Item
              {...restField}
              name={[name, 'color']}
              fieldKey={[fieldKey, 'color']}
              label="Màu sắc"
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
              {...restField}
              name={[name, 'quantity']}
              fieldKey={[fieldKey, 'quantity']}
              label="Số lượng"
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
              {...restField}
              name={[name, 'pictures']}
              fieldKey={[fieldKey, 'pictures']}
              label="Hình ảnh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ảnh',
                },
              ]}
            >
               <Upload {...props(fieldKey)}>
                <Button icon={<UploadOutlined />}>Ảnh</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              {...restField}
              name={[name, 'sku']}
              fieldKey={[fieldKey, 'sku']}
              label="SKU"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền SKU!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...restField}
              name={[name, 'status']}
              fieldKey={[fieldKey, 'status']}
              label="Trạng thái"
            >
              <Input />
            </Form.Item>
            <MinusCircleOutlined onClick={() => { remove(name); }} />
          </Collapse.Panel>
        </Collapse>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => { add(); }}
          icon={<PlusOutlined />}
        >
          Thêm thuộc tính
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>
  </Form>
</Modal>
        </Space>
      ),
    },
    {
      title: 'Ẩn/Hiện',
      dataIndex: 'isHide',
      render: (isHide, record) => (
        <Switch
          checked={!isHide}
          onChange={(checked) => {
            handleToggleHide(record._id, !checked);
          }}
        />
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "variant",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedProduct(record);
              setVariantModalVisible(true);
            }}
          >
            <AppstoreOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
const [attributeModalVisible, setAttributeModalVisible] = useState(false);
const [selectedVariant, setSelectedVariant] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleteVariantVisible, setDeleteVariantVisible] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isAddVariant, setAddVariant] = useState(false);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/getAll`)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API: ', error);
      });
  }, []);
  const addProductVariant = async (parentId, variantData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addProductvariant/${parentId}`,
        variantData
      );
      
      const updatedProductData = productData.map((product) => {
        if (product._id === parentId) {
          return { ...product, variant: [...product.variant, response.data.data] };
        }
        return product;
      });
  
      // Cập nhật productData
      setProductData(updatedProductData)
      form.resetFields();
    } catch (error) {
      throw error; 
    }
  };
  
  const handleSaveEdit = (id, values) => {
    const productId = id;
    axios.put(`${process.env.REACT_APP_API_URL}/product/editProduct/${productId}`, values)
      .then((response) => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
      .then((response) => {
        setProductData(response.data.data);
      })
      form.resetFields();
        setUpdate(false);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm: ", error);
      });
  };
  
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/product/delete/${productId}`)
      .then((response) => {
        const updatedProducts = productData.filter(product => product._id !== productId);
        setProductData(updatedProducts);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa sản phẩm: ', error);
      });
  };
  const handleDeleteProductvariant = (variantId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/product/deleteVariant/${variantId}`)
      .then((response) => {
        const updatedProductData = productData.map((product) => {
          const updatedVariants = product.variant.filter(
            (variant) => variant._id !== variantId
          );
          return { ...product, variant: updatedVariants };
        });
        setProductData(updatedProductData);

        const updatedSelectedProduct = {
          ...selectedProduct,
          variant: selectedProduct.variant.filter(
            (variant) => variant._id !== variantId
          ),
        };
        setSelectedProduct(updatedSelectedProduct);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa biến thể sản phẩm: ', error);
      });
  };
  
  
  const handleToggleHide = (productId, checked) => {
    axios.put(`${process.env.REACT_APP_API_URL}/product/editProduct/${productId}`, {
        isHide: checked, 
      })
      .then((response) => {     
        const updatedProduct = {
          ...productData.find(product => product._id === productId),
          isHide: checked, 
        };
        const updatedProducts = productData.map(product =>
          product._id === productId ? updatedProduct : product
        );
        console.log('checked',checked)
        setProductData(updatedProducts);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật sản phẩm: ', error);
      });
  };
  
  const showAttributesModal = (variant) => {
    setSelectedVariant(variant);
    setAttributeModalVisible(true);
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      axios.get(`${process.env.REACT_APP_API_URL}/product/searchProduct?keyword=${searchQuery}`)
        .then((response) => {
          setSearchResults(response.data.data);
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  return (
    <div>
         <div>
        <Search
          style={{ width: '50%' }}
          placeholder="Tìm kiếm sản phẩm"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
        </span>
      </div>
      <Table columns={columns} dataSource={searchQuery.trim() === '' ? productData.map((product, index) => ({
        ...product,
        key: index,
      })) : searchResults.map((product, index) => ({
        ...product,
        key: index,
      }))} />
<Modal
  title="Danh sách biến thể"
  visible={variantModalVisible}
  onCancel={() => setVariantModalVisible(false)}
  footer={null}
  width={1000}
>
  {selectedProduct && (
    <Table
      dataSource={selectedProduct.variant}
      columns={[
        {
          title: 'Bộ nhớ',
          dataIndex: 'memory',
          key: 'memory',
        },
        {
          title: 'Giá nhập',
          dataIndex: 'imPrice',
          key: 'imPrice',
        },
        {
          title: 'Giá cũ',
          dataIndex: 'oldPrice',
          key: 'oldPrice',
        },
        {
          title: 'Giá bán',
          dataIndex: 'newPrice',
          key: 'newPrice',
        },
    
        {
          title: 'Thuộc tính',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() => showAttributesModal(record)}><AppstoreOutlined/> </a>
            </Space>
          ),
        },
        {
          title: 'Thao tác',
          render: (text, record) => (
            <Space size="middle">
               <a onClick={() => setDeleteVariantVisible(true)}> <DeleteOutlined /></a>
                  <Modal
          title="Xác nhận xoá sản phẩm"
          visible={isDeleteVariantVisible}
          onOk={() => {
            handleDeleteProductvariant(record._id);
            setDeleteVariantVisible(false); 
          }}
          onCancel={() => setDeleteVariantVisible(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
        </Modal>
              <a><EditOutlined/></a>
          </Space>
          ),
        },
      ]}
    />
  )}
</Modal>

<Modal
  title={`Thuộc tính của biến thể - ${selectedVariant?.memory}`}
  visible={attributeModalVisible}
  onCancel={() => setAttributeModalVisible(false)}
  footer={null}
  width={800}
>
  {selectedVariant && (
    <Table
      dataSource={selectedVariant.attributes}
      columns={[
        {
          title: 'Mã sản phẩm',
          dataIndex: 'sku',
          key: 'sku',
        },
        {
          title: 'Màu sắc',
          dataIndex: 'color',
          key: 'color',
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Đã bán',
          dataIndex: 'sold',
          key: 'sold',
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'pictures',
          key: 'pictures',
          render: pictures => (
            <div>
                <Image
                  src={pictures}
                  alt={`Hình ảnh `}
                  style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                />
            </div>
          ),
        },
      ]}
    />
  )}
</Modal>
    </div>
  );
};

export default TableProduct;
