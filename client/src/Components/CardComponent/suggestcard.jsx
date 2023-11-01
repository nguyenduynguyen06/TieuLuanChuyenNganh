import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { WrapperSuggestCard } from './styled';

function SuggestCard({ searchKeyword }) {
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    if (searchKeyword) {
      getCategoryByName(searchKeyword);
    } else {
      setSearchedProducts([]);
    }
  }, [searchKeyword]);

  const getCategoryByName = async (keyword) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/searchProduct?keyword=${keyword}`);
      const productsData = response.data.data;
      setSearchedProducts(productsData);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };


  if (!searchKeyword || searchedProducts.length === 0) {
    return null; 
  }

  return (
    <WrapperSuggestCard>
    <div className='view-list' style={{ height: '400px', overflowY: 'scroll', textAlign: 'justify', position: 'absolute', zIndex:1, maxWidth: '440px'}}>
      {searchedProducts.map((product) => (
        product.variant.map((variant) => (
          <NavLink className='view-list__wrapper' to={`/product/${product.name}/${variant.memory}`} key={product._id + variant.memory}>
            <div className='item' style={{ border: '1px solid #ccc', padding: '10px' }}>
              <div className='item__img'>
                <img src={product.thumnails[0]} alt={product.name} />
              </div>
              <div className='item-info'>
                <h1 className='item-name'>{product.name} - {variant.memory}</h1>
                <div className='item-price'>
                  <div className='box-info__box-price' style={{ padding: '0 0 30px 0' }}>
                    <p className='product__price--show' style={{ fontWeight: 700, height: '20px' }}>
                      {variant.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className='product__price--through' style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>
                      {variant.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        ))
      ))}
    </div>
  </WrapperSuggestCard>
  );
}

export default SuggestCard;
