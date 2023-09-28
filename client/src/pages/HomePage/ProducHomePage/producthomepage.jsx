import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Card } from 'antd';
import { fontGrid } from '@mui/material/styles/cssUtils';
const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

function ProductHomePage() {
    const handleCardClick = (id) => {
        window.location.href = `/product/${id}`;
      };
  return (
    <Card title={<span style={{ fontSize: '24px', color:'#FF3300'} }>Điện thoại</span>}>
    <Card.Grid style={{ ...gridStyle ,cursor: 'pointer'}}onClick={() => handleCardClick(123)}>
      <MDBCard style={{display: 'grid'}}>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' fluid alt='...'/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </MDBRipple>   
        <MDBCardTitle style={{fontSize: '1rem'}}>Iphone 14 ProMax 256Gb</MDBCardTitle>   
        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000đ</MDBListGroupItem>
        <MDBListGroupItem style={{ textDecoration: 'line-through' }}>39.900.000 đ</MDBListGroupItem>   
        <MDBBtn href='/' style={{background:"#FF3300"}}>Mua ngay</MDBBtn>
        <MDBListGroupItem> <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png" alt=""style={{maxWidth: '100%', maxHeight: '100%', }}/>
        </MDBListGroupItem>
      </MDBCard>
    </Card.Grid>
    <Card.Grid style={{ ...gridStyle ,cursor: 'pointer'}}onClick={() => handleCardClick(123)}>
      <MDBCard style={{display: 'grid'}}>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' fluid alt='...'/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </MDBRipple>   
        <MDBCardTitle style={{fontSize: '1rem'}}>Iphone 14 ProMax 256Gb</MDBCardTitle>   
        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000đ</MDBListGroupItem>
        <MDBListGroupItem style={{ textDecoration: 'line-through' }}>39.900.000 đ</MDBListGroupItem>   
        <MDBBtn href='/' style={{background:"#FF3300"}}>Mua ngay</MDBBtn>
        <MDBListGroupItem> <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png" alt=""style={{maxWidth: '100%', maxHeight: '100%', }}/>
        </MDBListGroupItem>
      </MDBCard>
    </Card.Grid>
    <Card.Grid style={{ ...gridStyle ,cursor: 'pointer'}}onClick={() => handleCardClick(123)}>
      <MDBCard style={{display: 'grid'}}>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' fluid alt='...'/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </MDBRipple>   
        <MDBCardTitle style={{fontSize: '1rem'}}>Iphone 14 ProMax 256Gb</MDBCardTitle>   
        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000đ</MDBListGroupItem>
        <MDBListGroupItem style={{ textDecoration: 'line-through' }}>39.900.000 đ</MDBListGroupItem>   
        <MDBBtn href='/' style={{background:"#FF3300"}}>Mua ngay</MDBBtn>
        <MDBListGroupItem> <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png" alt=""style={{maxWidth: '100%', maxHeight: '100%', }}/>
        </MDBListGroupItem>
      </MDBCard>
    </Card.Grid>    <Card.Grid style={{ ...gridStyle ,cursor: 'pointer'}}onClick={() => handleCardClick(123)}>
      <MDBCard style={{display: 'grid'}}>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' fluid alt='...'/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </MDBRipple>   
        <MDBCardTitle style={{fontSize: '1rem'}}>Iphone 14 ProMax 256Gb</MDBCardTitle>   
        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000đ</MDBListGroupItem>
        <MDBListGroupItem style={{ textDecoration: 'line-through' }}>39.900.000 đ</MDBListGroupItem>   
        <MDBBtn href='/' style={{background:"#FF3300"}}>Mua ngay</MDBBtn>
        <MDBListGroupItem> <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png" alt=""style={{maxWidth: '100%', maxHeight: '100%', }}/>
        </MDBListGroupItem>
      </MDBCard>
    </Card.Grid>    <Card.Grid style={{ ...gridStyle ,cursor: 'pointer'}}onClick={() => handleCardClick(123)}>
      <MDBCard style={{display: 'grid'}}>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' fluid alt='...'/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </MDBRipple>   
        <MDBCardTitle style={{fontSize: '1rem'}}>Iphone 14 ProMax 256Gb</MDBCardTitle>   
        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000đ</MDBListGroupItem>
        <MDBListGroupItem style={{ textDecoration: 'line-through' }}>39.900.000 đ</MDBListGroupItem>   
        <MDBBtn href='/' style={{background:"#FF3300"}}>Mua ngay</MDBBtn>
        <MDBListGroupItem> <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png" alt=""style={{maxWidth: '100%', maxHeight: '100%', }}/>
        </MDBListGroupItem>
      </MDBCard>
    </Card.Grid>
</Card>
  );
}
export default ProductHomePage