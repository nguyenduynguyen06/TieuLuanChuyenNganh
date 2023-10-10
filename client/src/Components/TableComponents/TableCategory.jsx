import React, { useState, useEffect } from "react";
import {  Switch, Table, Image, Upload, Button, message} from 'antd';
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined } from '@ant-design/icons';
import Search from "antd/es/input/Search";


const TableCategory = () => {
    const [categoryData, setcategoryData] = useState([]); 
    
    const columns = [
      {
        title: 'Tên danh mục',
        dataIndex: 'name',
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'picture',
        render: (picture) => (
          <Image src={picture} width={100} height={100} /> 
        ),
      },
      {
        title: 'Thay đổi ảnh',
        render: (record) => {
            const props = {
                name: 'image',
                action: `${process.env.REACT_APP_API_URL}/uploadCategory/${record._id}`,
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
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    updateCategoryData(record._id, info.file.response.imageUrl);
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }
              };
              const updateCategoryData = (categoryId, newImageUrl) => {
                const updatedData = categoryData.map((item) =>
                  item._id === categoryId ? { ...item, picture: newImageUrl } : item
                );
                setcategoryData(updatedData);
              };
            return (
            <Upload {...props} >
            <Button icon={<UploadOutlined />}>Ảnh</Button>
          </Upload>
            )
        }
      },
      {
        title: 'Ẩn/Hiện',
        dataIndex: 'isHide',
        render: (isHide, record) => {
            return (
              <div>
                <Switch
                  checked={!isHide}
                  onChange={(checked) => handleSwitchChange(checked, record._id)}
                />
              </div>
            );
          },
      },
    ];
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/category/getAll`)
        .then((response) => {
            setcategoryData(response.data.data); 
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API: ', error);
        });
    }, []);
    const updateImage = (newImageUrl, categoryId) => {
        axios
          .put(`${process.env.REACT_APP_API_URL}/category/updateImage/${categoryId}`, { picture: newImageUrl })
          .then((response) => {
            if (response.data.success) {
              const updatedData = categoryData.map((item) =>
                item._id === categoryId ? { ...item, picture: newImageUrl } : item
              );
              setcategoryData(updatedData);
            } else {
              console.error('Lỗi khi cập nhật đường dẫn hình ảnh trong cơ sở dữ liệu');
            }
          })
          .catch((error) => {
            console.error('Lỗi khi thực hiện cuộc gọi API để cập nhật đường dẫn hình ảnh: ', error);
          });
      };
    const handleSwitchChange = (checked, categoryId) => {
        const newIsHide = !checked; 
        axios
          .put(`${process.env.REACT_APP_API_URL}/category/updateCategory/${categoryId}`, { isHide: newIsHide })
          .then((response) => {
            const updatedData = categoryData.map((item) =>
              item._id === categoryId ? { ...item, isHide: newIsHide } : item
            );
            setcategoryData(updatedData);
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật trạng thái: ', error);
          });
      };
    return (
      <div>
           <Search
          style={{ width: '50%' }}
          placeholder="Tìm kiếm danh mục"
         // onSearch={handleSearch}
          enterButton
        />
        <Table columns={columns} dataSource={categoryData} /> 
      </div>
    );
  };
  
  export default TableCategory;