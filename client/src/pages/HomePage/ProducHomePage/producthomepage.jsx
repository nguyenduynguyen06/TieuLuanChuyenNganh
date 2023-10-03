import React, { useState, useEffect } from 'react';
import { WrapperCard } from '../styled';
import axios from 'axios';
import { Button } from 'antd';

function ProductHomePage() {
  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});

  useEffect(() => {
    getCategoryByName();
  }, []);

  const getCategoryByName = async () => {
    try {
      const res = await axios.get('http://localhost:5000/category/getAll');
      const categories = res.data.data;
      const categoryName = 'Điện thoại';
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/product/getIdByCategory/${category._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);
      const initialMemories = {};
      productsData.forEach((product) => {
        initialMemories[product._id] = product.variant[0]?.memory;
      });
      setSelectedMemories(initialMemories);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleCardClick = (id) => {
    window.location.href = `/product/${id}`;
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const containerStyle = {
    maxHeight: isExpanded ? 'none' : '685px',
  };

  return (
    <WrapperCard>
      <h1 className='title'>Điện Thoại</h1>
      <br></br>
      <div className='mainContainer' style={containerStyle}>
        {products.map((product) => (
          <div className='box' key={product._id}>
            <div className='card'>
              <div className='image' onClick={() => handleCardClick(product._id)}>
                <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' />
              </div>
              <div className='desc'>
                <h1>{product?.name}</h1>
                <div>
                  {product?.variant.map((variant) => (
                    <Button
                    className={` memory-button ${variant.memory === selectedMemories[product._id] ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedMemories((prevSelected) => ({
                        ...prevSelected,
                        [product._id]: variant.memory,
                      }));
                    }}
                    style={{padding:'5px 5px',marginInlineEnd: '5px'}}
                  >
                    {variant.memory}
                  </Button>
                  ))}
                  <span style={{fontWeight: 'bold' }}>
                    {product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                  <br></br>
                  <span style={{ color: '#000', textDecoration: 'line-through' }}>{product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
              </div>
              <div className='image'>
                <img src='https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png' />
              </div>
            </div>
            <button className='btn' href='#'>
              Mua Ngay
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleShowMoreClick} id='show-more'>
        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
      </button>
      <br></br>
    </WrapperCard>
  );
}

export default ProductHomePage;
