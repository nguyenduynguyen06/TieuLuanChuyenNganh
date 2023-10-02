import React, { useState } from "react";
import axios from "axios";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function Forget({ onClose }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    email: '',
  });

  const [success, setSuccess] = useState(false);

  const forgetHandler = event => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/user/forget`, user,
        {
            withCredentials: true,
        })
        .then((res) => {
          setSuccess(true);
              setMessage(`Hãy kiểm tra email xác nhận`);
        }).catch((err) => {
          setSuccess(false);
          setMessage(`Email chưa được đăng ký tài khoản`);
        })
}
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleForget = event => {
    event.preventDefault();
    toggleModal(); // Hiện thông báo popup khi bấm Xác nhận
  };

  return (
    <div>
      <form className="form-add-new" onSubmit={handleForget}>
        <MDBContainer fluid>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                  {message && (
                    <h4 className="fw-bold mb-2 text-center">
                      <i className="fas fa-times-circle" style={{ color: 'red' }}>&nbsp;</i>
                      {message}
                    </h4>
                  )}
                  <h2 className="fw-bold mb-2 text-center">Quên Mật Khẩu</h2>
                  <p className="text-white-50 mb-3"></p>
                  <MDBInput wrapperClass='mb-4 w-100' label='Email' name="email" type='email' size="lg" />
                  <MDBBtn size='lg' type="submit">
                    Xác nhận
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>

      {/* Thông báo popup */}
      {isModalVisible && (
        <MDBModal tabIndex='-1' show={isModalVisible} onHide={toggleModal}>
          <MDBModalDialog centered>
            <MDBModalContent st>
              <MDBModalHeader >
                Thông báo
              </MDBModalHeader>
              <MDBModalBody>
                {/* Nội dung thông báo */}
                <p>Hãy kiểm tra!</p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn onClick={toggleModal}>
                  Quay lại
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </div>
  );
}

export default Forget;
