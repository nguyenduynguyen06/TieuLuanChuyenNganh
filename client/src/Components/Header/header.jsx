import React, { useState }from "react";
import { Col} from 'antd';
import axios from "axios";
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderImage, WrapperHeaderProduct} from "./style";
import Search from "antd/es/input/Search";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import {
    UserOutlined,
    ShoppingCartOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import TypeProducts from "./typeproducts";
import Login  from "./login"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody
  } from 'mdb-react-ui-kit';
import Register from "./register";
const arr = ['Xiaomi','Iphone','Samsung']
const Header = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/user/Logout', {}, { withCredentials: true }); 
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng xuất:', error);
    }
  };
    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);

    const [centredModal1, setCentredModal1] = useState(false);

    const toggleShow1 = () => setCentredModal1(!centredModal1);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const fullName = localStorage.getItem('fullName');
    const role_id = localStorage.getItem('role_id');

  const closePopup = () => {
    setCentredModal(false);
  };

  
  
    return (
        <div> 
    <WrapperHeader>
    <Col span={4}></Col>
    <Col span={4} className="ant-col">
        
         <WrapperHeaderImage className="ant-image">
            <img src="/image/didongg.png" alt="blink" />
        </WrapperHeaderImage>
    </Col>
        <Col span={8}>
        <Search
            placeholder="Tìm Kiếm"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            //onSearch={handleSearch}
         />
         <div >
            <WrapperHeaderProduct>
                {arr.map((item) => {
                    return(
                        <TypeProducts name = {item} key={item} />
                    )
                }
                )}
            </WrapperHeaderProduct>
         </div>
        </Col>
    <Col span={1}></Col>
        <Col span={7} >
            <WrapperHeaderAccount>
            {isLoggedIn ? (        
        <div>
          <MDBDropdown clickable >
               <MDBDropdownToggle tag="span"  style={{width: '50px', height: '50px',cursor: 'pointer'}}>
                       <UserOutlined style={{fontSize: '30px'}}/> Xin chào, {fullName}
             </MDBDropdownToggle>
                   <MDBDropdownMenu>
                   {role_id === '1' ? (
                      <MDBDropdownItem link  href="/admin">Quản lý</MDBDropdownItem>
                    ) : (
                      <span></span>
                    )}
                     <MDBDropdownItem link>Thông tin cá nhân</MDBDropdownItem>
                     <MDBDropdownItem link onClick={handleLogout}>Đăng xuất</MDBDropdownItem>
                   </MDBDropdownMenu>
              </MDBDropdown>
        </div>
      ) : (
        <div>
                
                <div  class= "popup" onClick={toggleShow}> 
                <span style={{fontSize: '15px'}} >
                    Đăng nhập
                </span>
                </div>
  
       
                <span style={{fontSize: '15px'}} >
                &nbsp; / &nbsp;
                </span>
           
         
                <div  class= "popup" onClick={toggleShow1}> <span style={{fontSize: '15px'}} >
                    Đăng ký&nbsp;
                </span>
             
            </div>   
         </div>
      )}
            <div><button class="custom-button" style={{backgroundColor: '#CC0000'}}>
            <ShoppingCartOutlined style={{fontSize: '20px'}} > 
            </ShoppingCartOutlined>&nbsp;Giỏ hàng
            </button>
            </div>
            </WrapperHeaderAccount>
            </Col>
    </WrapperHeader>


    
    <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
             <Login onClose={closePopup}/>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


    
      <MDBModal show={centredModal1} tabIndex='-1' setShow={setCentredModal1}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow1}></MDBBtn>
            </MDBModalHeader>
            <Register></Register>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </div>
    )
}
export default Header