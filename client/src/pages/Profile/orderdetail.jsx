import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    MDBBtn,
    MDBModalDialog,
    MDBModalContent,
  } from 'mdb-react-ui-kit';
import axios from "axios";
import { Col, Modal, Row } from "antd";
import ReviewModal from "./review";
const OrderDetail = () => {
    const [centredModal1, setCentredModal1] = useState(false);
    const toggleShow1 = () => setCentredModal1(!centredModal1);

    const [productName, setProductName] = useState('Iphone 14 pro max cuc chill bla bla');
    const maxCharLength = 30;
    useEffect(() => {
        if (productName.length > maxCharLength) {
            setProductName(productName.slice(0, maxCharLength) + '...');
        }
    }, []);


    return (
        <form className="form-add-new" style={{ background: '#fff', boxShadow: 'none', borderRadius: '4px' }}>
            <div>
                <h5 style={{ textAlign: 'center' }}>Thông tin đơn hàng</h5>
                <div style={{ background: '#fff', padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                    <p>Tình trạng đơn hàng:&nbsp;
                        <span>Đang giao hàng</span></p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', background: '#efefef', border: '1px solid #fff', borderRadius: '4px' }}>
                    <h6 style={{ margin: '0 0 5px 0' }}>Địa chỉ nhận hàng:</h6>
                    <p style={{ margin: 0 }}>Le Quang Duong</p>
                    <p style={{ margin: 0 }}>0987654321</p>
                    <p style={{ margin: 0 }}>Chi nhánh 1, Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                </div>
                <Row style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                    <Row style={{ padding: '20px 20px 0 20px', border: '1px solid #ccc' }} className='pre-order'>
                        <Row style={{ height: '90px' }}>
                            <Col span={4}>
                                <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '100%' }}></img>
                            </Col>
                            <Col span={10} style={{ padding: '0 0 0 10px' }} >
                                <a href="/" className="pdname" style={{ margin: 0, color: '#000' }}>{productName}</a>
                                <p style={{ margin: 0 }}>Đen</p>
                            </Col>
                            <Col span={5}>
                                <p style={{ margin: 0 }}>100000vnd</p>
                                <p style={{ margin: 0 }}>x<span>1</span></p>
                            </Col>
                            <Col span={5}>
                                <p style={{ margin: 0 }}>Hạn b.hành: </p>
                                <p style={{ margin: 0 }}>01-09-2002</p>
                                <a href="#"> Đánh giá</a>
                            </Col>
                        </Row>
                    </Row>
                    <Row style={{ padding: '20px 20px 0 20px', border: '1px solid #ccc' }} className='pre-order'>
                        <Row style={{ height: '90px' }}>
                            <Col span={4}>
                                <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '100%' }}></img>
                            </Col>
                            <Col span={10} style={{ padding: '0 0 0 10px' }} >
                                <a href="/" className="pdname" style={{ margin: 0, color: '#000' }}>{productName}</a>
                                <p style={{ margin: 0 }}>Đen</p>
                            </Col>
                            <Col span={5}>
                                <p style={{ margin: 0 }}>100000vnd</p>
                                <p style={{ margin: 0 }}>x<span>1</span></p>
                            </Col>
                            <Col span={5}>
                                <p style={{ margin: 0 }}>Hạn b.hành: </p>
                                <p style={{ margin: 0 }}>01-09-2002</p>
                                <a onClick={toggleShow1}> Đánh giá</a>
                            </Col>
                        </Row>
                    </Row>
                </Row>
                <p style={{ textAlign: 'right', padding: '10px', background: '#efefef', border: '1px solid #fff', borderRadius: '4px' }}><strong>Thành tiền:</strong> 1022200000</p>
                <div style={{ padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                    <h6 style={{ margin: '0 0 5px 0' }}>Phương thức thanh toán:</h6>
                    <p>Thanh toán khi nhận hàng</p>
                </div>
                <div style={{ padding: '10px', background: '#efefef', border: '1px solid #fff', borderRadius: '4px' }}>
                    <p>Mã đơn hàng:&nbsp; <span>GX??</span></p>
                    <p>Thời gian đặt hàng:&nbsp; <span>01-09-2002 14:20</span></p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <MDBBtn style={{ backgroundColor: "#FF3300", width: '49%' }}>Yêu cầu hủy/trả hàng</MDBBtn>
                <MDBBtn style={{ color: 'red', backgroundColor: '#FFF', width: '49%' }}>Đã nhận được hàng</MDBBtn>
            </div>
            <Modal
                visible={centredModal1}
                onCancel={toggleShow1}
                footer={null}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <ReviewModal></ReviewModal>
                    </MDBModalContent>
                </MDBModalDialog>
            </Modal>
        </form>
    );

}

export default OrderDetail