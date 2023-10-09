import React from 'react'
import { Card } from 'antd';
import { CardWrapper } from './style';


const gridStyle = {
  width: '20%',
  textAlign: 'center',
  fontSize: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Căn giữa theo chiều dọc
  alignItems: 'center', // Căn giữa theo chiều ngang
  backgroundImage: 'linear-gradient(to right, #8c52ff,  #ff3300)',
  borderRadius: '5px'

};
const Category = () => {
  const handleCardClick = (id) => {

    window.location.href = `/category/${id}`;
  };
  return (
    <CardWrapper title={<span style={{ fontSize: '24px', color: '#FF3300' }} >Danh mục</span>}>
      <Card.Grid style={{ ...gridStyle, cursor: 'pointer' }} onClick={() => handleCardClick(123)}>
        <img src='https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2015/img-dienthoai-desk.png'
          className='img-fluid rounded'/>
        <p>Điện thoại</p>
      </Card.Grid>
      <Card.Grid style={{ ...gridStyle, cursor: 'pointer' }} onClick={() => handleCardClick(123)}>
        <img src='https://freepngimg.com/save/33095-phone-case-transparent/680x743'
          className='img-fluid rounded' alt='' />
        <p>Ốp lưng</p>
      </Card.Grid>
      <Card.Grid style={{ ...gridStyle, cursor: 'pointer' }} onClick={() => handleCardClick(123)}>
        <img
          src='https://png.pngtree.com/png-clipart/20230504/ourmid/pngtree-airpods-png-image_7081756.png'
          className='img-fluid rounded'
          alt=''
        />
        <p>Tai nghe</p>
      </Card.Grid>
      <Card.Grid style={{ ...gridStyle, cursor: 'pointer' }} onClick={() => handleCardClick(123)}>
        <img
          src='https://static.vecteezy.com/system/resources/previews/016/694/739/original/white-charger-phone-with-transparent-background-png.png'
          className='img-fluid rounded'
          alt=''
        />
        <p>Cáp sạc</p>
      </Card.Grid>
      <Card.Grid style={{ ...gridStyle, cursor: 'pointer' }} onClick={() => handleCardClick(123)}>
        <img
          src='https://tlctrading.vn/uploads/Mazer/kinh-cuong-luc/kinh-cuong-luc-iphone-12-pro-max/M_IG2020IP6.1full%202%20500x500.png'
          className='img-fluid rounded'
          alt=''
        />
        <p>Kính cường lực</p>
      </Card.Grid>
    </CardWrapper>
  )
}

export default Category