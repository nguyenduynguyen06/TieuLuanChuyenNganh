import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { WrapperPaymentInfo } from "./style";
import { WrapperHomePage } from "../HomePage/styled";
import { Col, Row } from "antd";
import Header from "../../Components/Header/header";
const PaymentInfo = () => {
    const [user, setUser] = useState({
        fullName: '',
        addRess: '',
        phone_number: '',
        email: '',
    });
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <br></br>
            <Row>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '60%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <WrapperPaymentInfo>
                        <div className="block-box">
                            <div className="nav">
                                <div className="nav__item1">
                                    <span>1. Thông tin</span>
                                </div>
                                <div className="nav__item2">
                                    <span>2. Thanh toán</span>
                                </div>
                            </div>
                            <div className="view-list">
                                <div className="view-list__wrapper">
                                    <div className="item">
                                        <img className='item__img' src="../../image/logo.png"></img>
                                        <div className="item-info">
                                            <p className="item-name">iphone 20</p>
                                            <div className="item-price">
                                                <div>
                                                    <div className="box-info__box-price">
                                                        <p className="product__price--show">20000000</p>
                                                        <p className="product__price--through">20000000</p>
                                                    </div>
                                                </div>
                                                <p>Số lượng:
                                                    <span style={{ color: 'red' }}>1</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-customer">
                                <p>Thông tin khách hàng</p>
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Họ và tên' name="fullName" value={user.fullName} onChange={onChange} type='text' tabIndex="1" />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user.addRess} onChange={onChange} type='text' tabIndex="2" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user.phone_number} onChange={onChange} type='text' tabIndex="3" />
                                <MDBInput wrapperClass='mb-4' label='Email' name="email" value={user.email} onChange={onChange} type='email' tabIndex="4" />
                            </div>
                            <div className="block-payment"></div>
                            <div className="bottom-bar">
                                <div className="total-box">
                                    <span style={{fontWeight: '600'}}>Tổng tiền tạm tính</span>
                                    <div className="price">
                                        <span className="total">4000000</span>
                                    </div>
                                </div>
                                <div className="btn-submit">
                                    <button className="btn-next">Tiếp tục</button>
                                </div>
                            </div>
                        </div>
                    </WrapperPaymentInfo>
                </Col>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
            </Row>
        </div>
    )
}

export default PaymentInfo;