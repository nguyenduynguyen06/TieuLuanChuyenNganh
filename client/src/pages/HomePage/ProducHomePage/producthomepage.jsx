import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBRipple,
  MDBCardImage,
  MDBBtn,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
} from 'mdb-react-ui-kit';

import { Card } from 'antd';
import { fontGrid } from '@mui/material/styles/cssUtils';
import { WrapperCard } from '../styled';
const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };



function ProductHomePage() {
    const handleCardClick = (id) => {
        window.location.href = `/product/${id}`;
      };
    const [isExpanded, setIsExpanded] = useState(false);
    const handleShowMoreClick = () => {
      setIsExpanded(!isExpanded);
    };
  
    const containerStyle = {
      maxHeight: isExpanded ? 'none' : '685px',
    };

  return ( 
    <WrapperCard >
    <h1 className='title'>Điện Thoại</h1>
    <br></br>
    <div className='mainContainer' style={containerStyle}>
        <div className='box'>
          <div className='card' onClick={() => handleCardClick('./pdd')}>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn' href='#'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
        <div className='box'>
          <div className='card'>
            <div className='image'>
              <img src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg'/>
            </div>
            <div className='desc'>
              <h1>Iphone 14 ProMax 256Gb</h1>
              <p>Chính hãng VN(A)</p>
              <span>36.600.000đ</span>
              <br></br>
              <span style={{color: '#000', textDecoration: 'line-through'}}>39.900.000đ</span>
            </div>
            <div className='image'>
              <img src="https://cdn-v2.didongviet.vn/files/default/2023/6/7/0/1688744699122_nhaan_02_03_1.png"/>
            </div>
          </div>
          <button className='btn'>Mua Ngay</button>
        </div>
    </div>
    <button onClick={handleShowMoreClick} id="show-more">
        {isExpanded ? 'Thu gọn' : 'Xem thêm'}</button>
    <br></br>
    </WrapperCard>

  );
}
export default ProductHomePage