import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import { WrapperCard } from './styled';

function CardComponent() {  
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});

  useEffect(() => {
    getProductsByCategoryName(name);
  }, [name]); 

  const getProductsByCategoryName = async (categoryName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/getIdByCategory/${category._id}`
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
  

  
    return (
      <WrapperCard>
        <div className='mainContainer'>
        {products.filter((product) => product.isHide === false).map((product) => (
            <div className='box' key={product._id}>
              <div className='card'>
                <div className='image' onClick={() => handleCardClick(product._id)}>
                  <img src={product.thumnails[0]} />
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
                    <div style={{ margin: 0}}>
                    <p style={{fontWeight: 700, height:'20px' }}>
                      {product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div style={{ }}>
                    <p style={{ color: '#000', textDecoration: 'line-through',height:'20px'  }}>{product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                  </div>
                </div>
                <div className='image'>
                  <img src='https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </WrapperCard>
    );
}

export default CardComponent;
