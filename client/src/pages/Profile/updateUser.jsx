import React, { useState } from "react";
import { Alert } from "antd";

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
import { useSelector } from "react-redux";
import axios from 'axios';
const UpdateUser = () => {
  const user = useSelector((state) => state.user)
  const [user1, setUser] = useState({
    fullName: user.fullName,
    addRess: user.addRess,
    phone_number: user.phone_number,
    birthDay: user.birthDay,
  });

  const onChange = event => {
    setUser({ ...user1, [event.target.name]: event.target.value });
  }

  const updateUser = event => {
    event.preventDefault();
    try {
      const updatedData = {};
      if (user1.fullName) {
        updatedData.fullName = user1.fullName;
      }
      if (user1.addRess) {
        updatedData.addRess = user1.addRess;
      }
      if (user1.phone_number) {
        updatedData.phone_number = user1.phone_number;
      }
      if (user1.birthDay) {
        updatedData.birthDay = user1.birthDay;
      }
      if (user1.avatar) {
        updatedData.avatar = user1.avatar;
      }
      axios.post(
        `${process.env.REACT_APP_API_URL}/user/update/${user._id}`,
        updatedData, {
        withCredentials: true,
      }
      );
      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
    }
  };
  return (

    <form className="form-add-new" onSubmit={updateUser}>

      <MDBContainer fluid>

        <MDBCardBody className='p-5 text-center'>

          <Alert
            message="Lưu ý: Sửa thuộc tính nào chỉ cần điền vào thuộc tính đó không cần điền tất cả"
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          <h2 className="fw-bold mb-5">Cập nhật thông tin</h2>
          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Họ và tên' name="fullName" value={user1.fullName} onChange={onChange} type='text' tabIndex="1" />
            </MDBCol>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user1.addRess} onChange={onChange} type='text' tabIndex="2" />
            </MDBCol>
          </MDBRow>
          <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user1.phone_number} onChange={onChange} type='text' tabIndex="3" />

          <br />
          <a href="/profile"> <MDBBtn className='w-100 mb-4' size='md' style={{ background: '#FF3300' }}>Lưu</MDBBtn> </a>
        </MDBCardBody>

      </MDBContainer>
    </form>
  )
}

export default UpdateUser