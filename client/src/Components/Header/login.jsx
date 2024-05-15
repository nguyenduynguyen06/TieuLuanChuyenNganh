import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBModalHeader,
  MDBIcon
}
  from 'mdb-react-ui-kit';

import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/Slide/userSlice";
import Forget from "./forget";
import Header from "./header";
import { Button, Modal } from "antd";


function Login({ onClose }) {
  const [message, setMessage] = useState('');
  const axiosJWT = axios.create();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    passWord: ''
  });
  const onChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  const handleCloseModal = () => setShowModal(false);

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const closePopup = () => {
    setCentredModal(false);
  };

  
  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/checkAcc/${user.email}`);
      const { isBlocked } = response.data;
      if (isBlocked) {
        setMessage('Tài khoản của bạn đã bị khoá. Vui lòng liên hệ với quản trị viên.');
        setShowModal(true);
      } else {
        axios
          .post(`${process.env.REACT_APP_API_URL}/user/Login`, user, {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem('access_token', JSON.stringify(res.data.access_Token));
            if (res.data.access_Token) {
              const decoded = jwt_decode(res.data.access_Token);
              if (decoded.id) {
                handleGetDetails(decoded.id, res.data.access_Token);
              }
            }
            navigate('/');
            onClose();
          })
          .catch((err) => {
            setMessage('Hãy kiểm tra lại email hoặc password');
            setShowModal(true);
          });
      }
    } catch (error) {
      setMessage('Hãy kiểm tra lại email');
      setShowModal(true);
    }
  };

  const handleGetDetails = async (id, access_Token) => {
    try {
      const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-Detail/${id}`, {
        headers: {
          token: `Bearer ${access_Token}`,
        }
      })
      dispatch(updateUser({ ...res.data.data, access_token: access_Token }))
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }



  return (
    <div>
      <MDBContainer fluid >
        <MDBRow>
          <MDBCol sm='5' className='d-none d-sm-block px-0'>
            <img src="../../image/about-background-image.png"
              alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </MDBCol>
          <MDBCol sm='7' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            {message && (
              <Modal
                title={showModal ? "Lỗi!" : "Thành công"}
                visible={true}
                footer={null}
                onCancel={() => setMessage('')} // Đóng modal khi người dùng nhấn nút đóng
              >
                <h2 style={{ fontSize: '20px' }}>
                  {showModal ? (
                    <i className="fas fa-times-circle" style={{ color: 'red' }}>&nbsp;</i>
                  ) : (
                    <i className="fas fa-check-circle" style={{ color: 'green' }}>&nbsp;</i>
                  )}
                  {message}
                </h2>
              </Modal>
            )}


            <div className='d-flex flex-row' style={{ paddingTop: '20px' }}>
              <img className="logo" src="../../image/didong3.png" alt="" style={{ maxWidth: '100%' }} />
            </div>
            <h3 className="fw-normal" style={{ letterSpacing: '1px', color: '#B63245' }}>Đăng nhập</h3>
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <form onSubmit={loginHandler}>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email' name="email" value={user.email} type='email' size="lg" onChange={onChange}   />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' name="passWord" value={user.passWord} type='password' size="lg" onChange={onChange}   />
              <MDBBtn className="mb-4 px-5 mx-5 w-100" style={{ background: '#B63245' }} size='lg' type="submit"
              >Đăng nhập</MDBBtn>
              </form>
              <p className="ms-5 text-muted " style={{ cursor: 'pointer' }} onClick={toggleShow} >Quên mật khẩu?</p>
              <span className="ms-5 text-muted ">Bạn chưa có tài khoản? <NavLink to='/register'>Đăng ký ngay</NavLink></span>
            </div>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Forget onClose={closePopup} />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Forget onClose={closePopup} />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Login;