import { Button } from 'antd';
import React from 'react';

function CartTotal({ data }) {
  // Check if data is null or undefined
  if (data === null || data === undefined) {
    return null; // Return null or handle the case when data is not available
  }
  const handleBuy = () => {
    alert('Bạn đã thực hiện mua hàng!'); // Customize this to perform an actual purchase action
  };

  // Calculate the total price based on cart items
  const total = data.reduce((acc, item) => {
    const itemPrice = item.price * item.quantity;
    return acc + itemPrice;
  }, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', alignItems:'center' }}>
        <span style={{ fontWeight: 600 }}>Tổng giá:&nbsp;</span>
        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF3300' }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(total)}
        </span>
        <Button size='large' style={{marginLeft:'100px', background:'#8c52ff', color:'#fff'}} onClick={handleBuy}>Mua hàng</Button>
      </div>
    </div>
  );
}

export default CartTotal;
