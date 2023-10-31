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
import { ArrowLeftOutlined } from "@ant-design/icons"
import { WrapperDetailOrder } from "./order/style";
import Header from "../../Components/Header/header";

const OrderDetail = () => {
    const [centredModal1, setCentredModal1] = useState(false);
    const toggleShow1 = () => setCentredModal1(!centredModal1);


    const goBack = () => {
        window.history.back();
    };

    return (
        <div>
            <Header></Header>
            <br></br>
            <WrapperDetailOrder>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '60%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <div>
                        <div className="nav">
                            <button className="btn-back" onClick={goBack}>
                                <ArrowLeftOutlined />&nbsp;Quay lại
                            </button>
                            <h5 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Thông tin đơn hàng</h5>
                            <h5 style={{ textAlign: 'center', color: 'transparent'}}> nothinghere  </h5>
                        </div>
                        <div style={{ background: '#14d9c5', fontWeight: 600, color: '#fff', border: '1px solid #efefef', borderRadius: '4px', display: 'flex', padding: '12px 10px 0 10px' }}>
                            <p>Tình trạng đơn hàng:&nbsp;
                                <span>Đang giao hàng</span></p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                            <label style={{ margin: '0 0 5px 0', fontWeight: 600 }}>Địa chỉ nhận hàng:</label>
                            <p style={{ margin: 0 }}>Le Quang Duong</p>
                            <p style={{ margin: 0 }}>0987654321</p>
                            <p style={{ margin: 0 }}>Chi nhánh 1, Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                        </div>
                        <Row style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                            <Row style={{ padding: '10px', border: '1px solid #ccc' }} className='pre-order'>
                                <Row style={{ height: 'auto' }}>
                                    <Col span={3} style={{  display: 'flex', justifyContent:'center', alignItems:'center' }} >
                                        <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '100%' }}></img>
                                    </Col>
                                    <Col span={21} style={{ padding: '0 0 0 10px' }} >
                                        <div style={{width: '100%'}}>
                                            <a href="/" className="pdname" style={{ margin: 0, color: '#000' }}>Iphone 14 là cái tên cực dài dài thòn lòn dài nữa coi nó có sao ko</a>
                                        </div>
                                        <div>
                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                                <p style={{ margin: 0 }}>Phân loại:&nbsp;<span>Đen</span></p>
                                                <div>
                                                    <p style={{ margin: 0 }}>100000000000vnd</p>
                                                    <p style={{ margin: 0, textAlign:'right' }}>x<span>1</span></p>
                                                </div>
                                                <div>
                                                    <p style={{ margin: 0 }}>Hạn bảo hành: </p>
                                                    <p style={{ margin: 0 }}>01-09-2002</p>
                                                    <a style={{ color: "#ff3300" }} onClick={toggleShow1}> Đánh giá</a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </Row>
                        </Row>
                        <p style={{ textAlign: 'right', padding: '10px', background: '#fff', border: '1px solid #ff3300', borderRadius: '4px', fontWeight: 600 }}>Thành tiền:&nbsp;<span style={{ color: "#ff3300" }}> 1022200000</span>
                        </p>
                        <div style={{ padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                            <h6 style={{ margin: '0 0 5px 0' }}>Phương thức thanh toán:</h6>
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                        <div style={{ padding: '10px', background: '#fff', border: '1px solid #efefef', borderRadius: '4px' }}>
                            <p>Mã đơn hàng:&nbsp;<span>GX??</span></p>
                            <p>Thời gian đặt hàng:&nbsp; <span>01-09-2002 14:20</span></p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <MDBBtn style={{ backgroundColor: "#8c52ff", width: '49%' }}>Yêu cầu hủy/trả hàng</MDBBtn>
                        <MDBBtn style={{ color: '#8c52ff', backgroundColor: '#FFF', width: '49%' }}>Đã nhận được hàng</MDBBtn>
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
                </Col>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
            </WrapperDetailOrder>
        </div>
    );

}

export default OrderDetail