import React, { useEffect, useState } from 'react';
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
  MDBModalHeader,
} from 'mdb-react-ui-kit';
import { Card, Col, Collapse, Modal, Row } from 'antd';
import UpdateUser from './updateUser';
import ChangePassword from './changepass'
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from "react-redux";
import OrderDetail from './orderdetail';


const Profilepage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])
  const user = useSelector((state) => state.user)
  const [centredModal1, setCentredModal1] = useState(false);
  const [centredModal2, setCentredModal2] = useState(false);
  const [centredModal3, setCentredModal3] = useState(false);


  const toggleShow1 = () => setCentredModal1(!centredModal1);
  const toggleShow2 = () => setCentredModal2(!centredModal2);
  const toggleShow3 = () => setCentredModal3(!centredModal3);

  function checkFile(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên tệp tin JPG/PNG!');
    }
    return isJpgOrPng;
  }
  const props = {
    name: 'image',
    action: `${process.env.REACT_APP_API_URL}/uploadUser/${user._id}`,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        window.location.reload();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: checkFile,
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <img
                  src={user.avatar}
                  alt='avatar'
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />

                <div className="text-muted mb-1"></div>
                <Upload {...props}>
                  <MDBBtn style={{ backgroundColor: '#E8E8E8', color: "black" }}  > <UploadOutlined /> Ảnh đại diện</MDBBtn>
                </Upload>
                <div className="text-muted mb-1"></div>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={toggleShow1} style={{ backgroundColor: "#8c52ff" }}>Cập nhật thông tin</MDBBtn>
                  <MDBBtn onClick={toggleShow2} className="ms-1" style={{ border: '2px solid #8c52ff', color: '#8c52ff', backgroundColor: '#F5F5F5' }}>Đổi mật khẩu</MDBBtn>
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
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px' }}>
                    <p style={{ fontSize: '20px', fontWeight: 600 }}>Đơn hàng của tôi</p>

                    <div style={{ padding: '10px 10px 0 10px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }} className='pre-order'>
                      <div style={{ background: '#8c52ff', color: '#fff', padding: '10px 10px 0 10px', textAlign: 'right', fontWeight: 600, borderRadius: '4px 4px 0 0' }}>
                        <p>Đơn hàng&nbsp;<span>đang giao</span></p>
                      </div>
                      <div style={{ display: 'flex', height: 'auto', padding: '10px 10px 10px 0', border: '1px solid #ccc', borderRadius: '0 0 4px 4px' }}>
                        <div style={{ width: "20%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='order-img'>
                          <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '80%' }}></img>
                        </div>
                        <div style={{ width: "80%" }}>
                          <p style={{ fontWeight: 500 }}>Iphone 14 promaxxx</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div className='type' style={{ flex: 1 }}>
                              <p style={{ margin: 0 }}>Phân loại:&nbsp;<span>Đen</span></p>
                              <p style={{ margin: 0 }}>x1</p>
                            </div>
                            <div className='price' style={{ flex: 1, textAlign: 'right' }}>
                              <span style={{ textDecoration: 'line-through' }}>
                                20000000
                              </span>
                              &nbsp;
                              <span style={{ color: '#ff3300' }}>
                                19000000
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center', gap: '10px' }}>
                        <a style={{ cursor: 'default' }}>Số lượng hàng:&nbsp;
                          <span style={{ color: '#ff3300' }}>1</span></a>
                        <a style={{ cursor: 'default' }}>Thành tiền:&nbsp;
                          <span style={{ color: '#ff3300' }}>10000000</span></a>
                        <Button style={{ background: '#8c52ff', color: '#fff' }}>Đã nhận được hàng</Button>
                        <div>
                          <Button style={{ border: '1px solid #8c52ff', color: '#8c52ff' }} onClick={toggleShow3}>Xem thêm</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Modal
        visible={centredModal1}
        onCancel={toggleShow1}
        footer={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <UpdateUser></UpdateUser>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>

      <Modal
        visible={centredModal2}
        onCancel={toggleShow2}
        footer={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <ChangePassword></ChangePassword>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>

      <Modal
        visible={centredModal3}
        onCancel={toggleShow3}
        footer={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <OrderDetail></OrderDetail>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>
    </section>
  )
}

export default Profilepage