import React, { useState } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBFile,
}
from 'mdb-react-ui-kit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
    const user = useSelector((state)=> state.user)
    const navigate = useNavigate();
    const [user1, setUser] = useState({
        fullName: '',
        addRess: '',
        phone_number: '',
        email: '',
        birthDay: '',
        avatar: ''   
      });
      
      const onChange = event => {
        setUser({ ...user1, [event.target.name]: event.target.value });
      }
      
const updateUser = event => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/update/${user._id}`, user1, {
            
          })
          .then((res) => {
            setUser({
              fullName: '',
              addRess: '',
              phone_number: '',
              email: '',
              birthDay: '', 
              avatar: ''    
            });
            navigate('/');
          }).catch((err) => {
            console.log('err',err)
          })
      }
  return (
    
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://img.freepik.com/premium-vector/happy-new-year-merry-christmas-horizontal-greeting_68196-4482.jpg?w=1800)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
     
        <form className="form-add-new"  onClick={updateUser}>
          <h2 className="fw-bold mb-5">Cập nhật thông tin</h2>
          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Họ và tên' name="fullName" value={user1.fullName} onChange={onChange} type='text' tabIndex="1"/>
            </MDBCol>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user1.addRess} onChange={onChange} type='text' tabIndex="2"/>
            </MDBCol>
          </MDBRow>
          <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user1.phone_number} onChange={onChange} type='text' tabIndex="3"/>
                  
          <MDBFile label='Ảnh đại diện' id='customFile' onChange={onChange} value={user1.avatar} name = "avatar"/>
        <br />
          <MDBBtn className='w-100 mb-4' size='md' style={{background: '#FF3300'}}>Lưu</MDBBtn>
          </form>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  )
}

export default UpdateUser