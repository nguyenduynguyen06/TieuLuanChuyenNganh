import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';


function Login({ onClose }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({
      email: '',
      passWord: ''
  });
  const onChange = event => {
      event.preventDefault();
      setUser({ ...user, [event.target.name]: event.target.value });
  }

  
  const loginHandler = event => {
      event.preventDefault();
      axios.post('http://localhost:5000/user/Login', user,
          {
              withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('fullName', res.data.fullName)
            localStorage.setItem('role_id', res.data.role_id)
              navigate('/');
              onClose();
          }).catch((err) => {
              setMessage(`Hãy kiểm tra lại email hoặc password`);
          })
  }




  return (
    <form className="form-add-new" onSubmit={(e) => {
      loginHandler(e);  
  }} >
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            {message && (
                <h4 className="fw-bold mb-2 text-center">
                    <i className="fas fa-times-circle" style={{ color: 'red' }}>&nbsp;</i>
                    {message}
                </h4>
            )}
      
              <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
              <p className="text-white-50 mb-3"></p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email'  name="email" value={user.email} type='email' size="lg" onChange={onChange}/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' name="passWord" value={user.passWord} type='password' size="lg" onChange={onChange}/>


              <MDBBtn size='lg' type="submit" >
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign in with facebook
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </form>
  );
}

export default Login;