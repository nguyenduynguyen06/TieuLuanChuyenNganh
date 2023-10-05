import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import { Space } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import Search from "antd/es/input/Search";
const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
  },
  {
    title: 'Bảo hành',
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
    render: theImageURL => <img alt={theImageURL} src={theImageURL} style={{ maxWidth: "100px", maxHeight: "100px" }}  />
  },
  {
    render: () => (
      <Space size="middle">
        <a ><AppstoreAddOutlined /></a>
        <a><EditOutlined /></a>
        <a><DeleteOutlined /></a>
      </Space>
    ),
  },
];

const TableProduct = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
 
    axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
      .then(response => {
        setProductData(response.data.data); 
      })
      .catch(error => {
        console.error('Lỗi khi gọi API: ', error);
      });
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
console.log(searchResults)
  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // Function to fetch search results from the API
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
    </div>
  );
};

export default TableProduct;
