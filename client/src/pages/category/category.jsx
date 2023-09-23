import React from 'react'
import { Card } from 'antd';


const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
const Category= () => {
  const handleCardClick = (id) => {
   
    window.location.href = `/product/${id}`;
  };
  return (
    <Card title={<span style={{ fontSize: '24px' }}>Danh mục điện thoại</span>}>
      <Card.Grid style={{ ...gridStyle,cursor: 'pointer' }}   onClick={() => handleCardClick(123)}>
      <img
        src='https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2015/img-dienthoai-desk.png'
        className='img-fluid rounded'
        alt=''
      />
      <br />
      <div>IPhone</div>
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
  )
}

export default Category