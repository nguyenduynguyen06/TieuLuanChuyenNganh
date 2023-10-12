// src/CartComponent/CartList.js
import { Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { WrapperCartList, WrapperQuantityProduct, WrapperInputNumber } from './style';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

function CartList() {
  const onChange = () => { }
  return (
    <WrapperCartList>
      <div className='header-list'>
        <div className='check-box'>
          <Checkbox></Checkbox>
        </div>
        <div className='product'>Sản phẩm</div>
        <div className='dongia'>Đơn giá</div>
        <div className='quantity'>Số lượng</div>
        <div className='amount'>Số tiền</div>
        <div className='action'>Thao tác</div>
      </div>
      <div className='content-list'>
        <div className='item'>
          <div className='item-check-box'>
            <Checkbox></Checkbox>
          </div>
          <div className='item-product'>
            <a href='/' className='item-image'>
              <img src='../../image/didong2.png' width={'50px'}></img>
            </a>
            <a href='/' className='item-name'>Iphone 15</a>
          </div>
          <div className='space'></div>
          <div className='item-dongia'>
            <span className='newprice'>20000000đ</span>
          </div>
          <div className='item-quantity'>
            <WrapperQuantityProduct>
              <button style={{ border: 'none', background: 'transparent' }}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <WrapperInputNumber /*min={1} max={10}*/ defaultValue={3} onChange={onChange} size="small" />
              <button style={{ border: 'none', background: 'transparent' }}>
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </WrapperQuantityProduct>
          </div>
          <div className='item-amount'>
            <span>20000000đ</span>
          </div>
          <div className='item-action'>
            <button className='dlt-btn'>Xóa</button>
          </div>
        </div>
      </div>
    </WrapperCartList>

  );
}

export default CartList;
