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
import { Button, Cascader, Col, Row } from "antd";
import Header from "../../Components/Header/header";
const PaymentInfo = () => {
    const [user, setUser] = useState({
        fullName: '',
        addRess: '',
        phone_number: '',
        email: '',
    });
    const pickStore = (value) => {
        console.log(value);
    };
    const [selectedPayment, setSelectedPayment] = useState('cashOnDelivery'); // Ban đầu chọn thanh toán khi nhận hàng

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    const [deliveryOption, setDeliveryOption] = useState('homeDelivery'); // Default to 'homeDelivery'
    const [address, setAddress] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    const handleRadioChange = (e) => {
        setDeliveryOption(e.target.value);
        if (e.target.value === 'homeDelivery') {
            setStoreAddress('');
        } else {
            setAddress('');
        }
    };
    const options = [
        {
            value: 'Chi nhánh 1',
            label: 'st1',
        },
        {
            value: 'Chi nhánh 2',
            label: 'st2',
        },
    ];

    return (
        <div>
            <Header />
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
                                        <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user.phone_number} onChange={onChange} type='text' tabIndex="3" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Email' name="email" value={user.email} onChange={onChange} type='email' tabIndex="4" />
                            </div>

                        </div>
                        <MDBRow style={{ height: '100px' }}>
                            <MDBCol col='6'>
                                <input
                                    type="radio"
                                    name="deliveryOption"
                                    value="homeDelivery"
                                    checked={deliveryOption === 'homeDelivery'}
                                    onChange={handleRadioChange}
                                />
                                <label>Giao tận nơi</label>
                                {deliveryOption === 'homeDelivery' && (
                                    <MDBInput style={{ marginTop: '10px' }} wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user.addRess} onChange={onChange} type='text' tabIndex="2" />
                                )}
                            </MDBCol>
                            <MDBCol col='6'>
                                <input
                                    type="radio"
                                    name="deliveryOption"
                                    value="storePickup"
                                    checked={deliveryOption === 'storePickup'}
                                    onChange={handleRadioChange}
                                />
                                <label>Nhận tại cửa hàng</label>
                                {deliveryOption === 'storePickup' && (
                                    <div>
                                        <Cascader
                                            style={{ marginTop: '12px', width: '100%' }}
                                            options={options} onChange={pickStore}
                                            placeholder="Hãy chọn địa chỉ cửa hàng"
                                            dropdownHeight={20}
                                        />
                                    </div>
                                )}
                                <br></br>

                            </MDBCol>
                        </MDBRow>
                        <div className="info-payment">
                            <div className="block-promotion">
                                <div className="block-promotion-input" style={{ width: '75%' }}>
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Mã giảm giá'
                                        placeholder="Hãy điền mã giảm giá"
                                        name="promotion"
                                        value={user.promotion}
                                        onChange={onChange}
                                        type='text'
                                        style={{ width: '100%' }} // Đặt chiều rộng 200px
                                        tabIndex="5"
                                    />
                                </div>
                                <Button size='middle' className="button__voucher" style={{fontSize:'15px', width: "20%"}}>Áp dụng</Button>
                            </div>
                            <div className="info-quote">
                                <div className="info-quote__block">
                                    <div className="quote-block__item">
                                        <p className="quote-block__title">Số lượng sản phẩm </p>
                                        <p className="quote-block__value">1</p>
                                    </div>
                                    <div className="quote-block__item">
                                        <p className="quote-block__title">Tiền hàng (Tạm tính) </p>
                                        <p className="quote-block__value">20000000</p>
                                    </div>
                                    <div className="quote-block__item">
                                        <p className="quote-block__title">Phí vận chuyển </p>
                                        <p className="quote-block__value">Miễn phí</p>
                                    </div>
                                </div>
                                <div className="info-quote__bottom">
                                    <p className="quote-bottom__title">Tổng tiền </p>
                                    <p className="quote-bottom__value">20000000</p>
                                </div>
                            </div>
                        </div>
                        <div className="payment-quote">
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="cashOnDelivery"
                                        checked={selectedPayment === 'cashOnDelivery'}
                                        onChange={handlePaymentChange}
                                    />
                                    Thanh toán khi nhận hàng
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="paypal"
                                        checked={selectedPayment === 'paypal'}
                                        onChange={handlePaymentChange}
                                    />
                                    Paypal
                                </label>
                            </div>
                        </div>
                        <div className="bottom-bar">
                            <div className="total-box">
                                <span style={{ fontWeight: '600' }}>Tổng tiền tạm tính</span>
                                <div className="price">
                                    <span className="total">4000000</span>
                                </div>
                            </div>
                            <div className="btn-submit">
                                <button className="btn-next">Thanh toán</button>
                            </div>
                        </div>
                    </WrapperPaymentInfo>
                </Col>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
            </Row>
        </div >
    )
}

export default PaymentInfo;