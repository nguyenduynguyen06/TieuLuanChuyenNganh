// src/CartPage/CartPage.js
import React from 'react';
import CartItem from '../../Components/CartComponent/CartItem';
import CartTotal from '../../Components/CartComponent/CartTotal';
import CartList from '../../Components/CartComponent/CartList';

function CartPage() {
  return (
    <div>
      <h1>Trang giỏ hàng</h1>
      <CartList/>
      <CartItem/>
      <CartTotal/>
    </div>
  );
}

export default CartPage;
