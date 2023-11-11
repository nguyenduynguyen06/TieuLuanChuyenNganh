// src/CartComponent/CartItem.js
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeaderWrapper } from './style';
import { ArrowLeftOutlined } from "@ant-design/icons";

function CartHeader({ product, removeFromCart }) {
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
  const goBack = () => {
    window.history.back();
  };

  return (
    <HeaderWrapper>
      <div className='cart-page-header'>
        <div className="btn-back">
          <a onClick={goBack}>
            <ArrowLeftOutlined /> Quay lại
          </a>
        </div>
        <div className='cart-page-logo' >
          <a viewBox="0 0 192 65" className='logo-icon' href='/'>
            <img src='../../image/didong2.png' />
          </a>
          <a className='cart-page-name' href='/cart'>Giỏ hàng</a>
        </div>
      </div>
    </HeaderWrapper>

  );
}

export default CartHeader;
