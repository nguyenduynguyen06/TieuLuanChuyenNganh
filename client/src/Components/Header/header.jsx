import React, { useState }from "react";
import { Button, Col} from 'antd';
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
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import { resetUser } from "../../redux/Slide/userSlice";
const arr = ['Xiaomi','Iphone','Samsung']

const Header = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/Logout`, {}, { withCredentials: true }); 
      dispatch(resetUser)
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng xuất:', error);
    }
  };
    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);

    const [centredModal1, setCentredModal1] = useState(false);

    const toggleShow1 = () => setCentredModal1(!centredModal1);

    const user = useSelector((state)=> state.user)
    const closePopup = () => {
      setCentredModal(false);
    };

  
  
    return (
    <div> 
    <WrapperHeader >
      <div>
            <WrapperHeaderImage className="ant-image">
              <a href="/"> <img src="../../image/didong1.png" alt="blink" /> </a>
            </WrapperHeaderImage>
      </div>
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!isHiddenSearch && (   
        <Search style={{width: '1fr'}}
            placeholder="Tìm Kiếm"
            allowClear
            enterButton={<Button style={{background:'#FF3300'}}><SearchOutlined style={{width: '10px',height: '20px',color: 'white'}}/> </Button>}
            size="large"
            // onSearch={handleSearch} 
            />)}
                 </div>
         <div >
          
         {!isHiddenSearch && (   
            <WrapperHeaderProduct>
                {arr.map((item) => {
                    return(
                        <TypeProducts name = {item} key={item} />
                    )}
                )}
            </WrapperHeaderProduct>)}
        </div>
        </div >
        <div className="grid-item">
          <WrapperHeaderAccount>
            {user?.fullName ? (        
          <div>
          <MDBDropdown clickable >
            <MDBDropdownToggle tag="span"  style={{width: '50px', height: '50px',cursor: 'pointer'}}>
              <UserOutlined style={{fontSize: '30px'}}/> Xin chào, {user.fullName}
            </MDBDropdownToggle>
           <MDBDropdownMenu>
              {user.role_id === 1 ? (
                <MDBDropdownItem link  href="/admin">Quản lý</MDBDropdownItem>
                  ) : (<span></span>
              )}
                <MDBDropdownItem link href="/profile">Thông tin cá nhân</MDBDropdownItem>
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

      {!isHiddenCart && (
            <div className="grid-item">
              <button class="custom-button" style={{backgroundColor: '#CC0000', right: '0px'}}>
              <ShoppingCartOutlined style={{fontSize: '20px'}} > 
              </ShoppingCartOutlined>&nbsp;Giỏ hàng
              </button>
            </div>)}
            </WrapperHeaderAccount>
            </div>
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