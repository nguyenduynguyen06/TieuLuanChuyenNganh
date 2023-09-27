import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader
} from 'mdb-react-ui-kit';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import UpdateUser from './updateUser';
const Profilepage = () => {
    const user = useSelector((state)=> state.user)
    const [centredModal1, setCentredModal1] = useState(false);

    const toggleShow1 = () => setCentredModal1(!centredModal1);

      
  return (
    <section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5">

      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid />
              <p className="text-muted mb-1"></p>
              <div className="d-flex justify-content-center mb-2">
              <MDBBtn onClick={toggleShow1}>Cập nhật thông tin</MDBBtn>
                <MDBBtn  className="ms-1">Đổi mật khẩu</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
          <Card title="Voucher hiện có">
          <MDBCard style={{ maxWidth: '540px' }}>
            <MDBCardTitle className="ms-1"> Khuyến mãi 30%</MDBCardTitle>
              <MDBListGroupItem className="ms-1">Mô tả: Sử dụng cho việc giảm giá 30% sản phẩm </MDBListGroupItem>
            <MDBListGroupItem className="ms-1">Ngày áp dụng: 20/10/2023</MDBListGroupItem>
            <MDBListGroupItem className="ms-1">Ngày hết hạn: 21/10/2023</MDBListGroupItem>
          <MDBListGroupItem className="ms-1">Trạng thái: Còn hạn</MDBListGroupItem>
          </MDBCard>
          </Card>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Họ và Tên</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.fullName}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.email}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Số điện thoại</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.phone_number}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Ngày sinh</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.birthDay}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Địa chỉ</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{user.addRess}</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow>
            <MDBCol sm="20">
              <MDBCard className="mb-4 mb-md-0">
              <Card title="Đơn hàng đã mua">
                    
                    <MDBCard style={{ maxWidth: '540px' }}>
                    <MDBRow className='g-0'>
                        
                        <MDBCol md='4'>
                        <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' alt='...' fluid />
                        </MDBCol>
                        <MDBCol md='7'>
                        <MDBCardBody>
                        <MDBCardTitle>Iphone 14 ProMax 256GB</MDBCardTitle>
                        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
                        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000 đ</MDBListGroupItem>
                        <MDBListGroupItem >Địa chỉ: Hồ Chí Minh</MDBListGroupItem>
                        <MDBListGroupItem >Trạng thái: Đã giao</MDBListGroupItem>
                       
                        </MDBCardBody>
                        </MDBCol>
                        <MDBCol> <MDBCardLink>More</MDBCardLink></MDBCol>
                    </MDBRow>
                    </MDBCard>
                        
                    </Card>
                    <Card >
                    <MDBCard style={{ maxWidth: '540px' }}>
                    <MDBRow className='g-0'>
                        
                        <MDBCol md='4'>
                        <MDBCardImage src='https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg' alt='...' fluid />
                        </MDBCol>
                        <MDBCol md='7'>
                        <MDBCardBody>
                        <MDBCardTitle>Iphone 14 ProMax 256GB</MDBCardTitle>
                        <MDBListGroupItem>Chính hãng VN(A)</MDBListGroupItem>
                        <MDBListGroupItem style={{color: 'red', fontWeight:'bolder',fontSize:'20px'}}>36.600.000 đ</MDBListGroupItem>
                        <MDBListGroupItem >Địa chỉ: Hồ Chí Minh</MDBListGroupItem>
                        <MDBListGroupItem >Trạng thái: Đã giao</MDBListGroupItem>
                       
                        </MDBCardBody>
                        </MDBCol>
                        <MDBCol> <MDBCardLink>More</MDBCardLink></MDBCol>
                    </MDBRow>
                    </MDBCard>
                        
                    </Card>
              </MDBCard>
            </MDBCol>

           
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>




    <MDBModal show={centredModal1} tabIndex='-1' setShow={setCentredModal1}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow1}></MDBBtn>
            </MDBModalHeader>
            <UpdateUser></UpdateUser>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  </section>
  )
}

export default Profilepage