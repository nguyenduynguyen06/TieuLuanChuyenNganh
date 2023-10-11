// src/CartComponent/CartItem.js
import React from 'react';

function CartItem({ product, removeFromCart }) {
  
  return (
    <div className="cart-item">
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Giá: {product.price} đồng</p>
      </div>
      <button onClick={() => removeFromCart(product)}>Xóa</button>
    </div>
  );
}

export default CartItem;
