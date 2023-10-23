import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import { WrapperPaymentInfo } from "./style";
import { Button, Cascader, Col, Row, Modal, FloatButton } from "antd";
import Header from "../../Components/Header/header";
import { ArrowLeftOutlined } from "@ant-design/icons"

const PaymentInfo = () => {
    const [user, setUser] = useState({
        fullName: '',
        addRess: '',
        phone_number: '',
        email: '',
    });

    const goBack = () => {
        window.history.back();
    };

    const pickStore = (value) => {
        console.log(value);
    };
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    const handleConfirmOk = () => {
        // Xử lý khi người dùng xác nhận
        // Để thực hiện thanh toán ở đây
        setIsConfirmModalVisible(false);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalVisible(false);
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
        <div style={{ background: '#efefef' }}>
            <Header />
            <br></br>
            <Row>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '60%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <WrapperPaymentInfo>
                        <div className="block-box">
                            <div className="nav">
                                <button className="btn-back" onClick={goBack}>
                                    <ArrowLeftOutlined /> Quay lại
                                </button>
                                <div className="nav__item2">
                                    <span>Thanh toán</span>
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
                            <hr></hr>
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
                                <MDBRow style={{ height: '100px' }} className="picking-address">
                                    <MDBCol col='6'>
                                        <input
                                            type="radio"
                                            name="deliveryOption"
                                            value="homeDelivery"
                                            checked={deliveryOption === 'homeDelivery'}
                                            onChange={handleRadioChange}
                                        />
                                        <label>&nbsp;Giao tận nơi</label>
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
                                        <label>&nbsp;Nhận tại cửa hàng</label>
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
                            </div>
                        </div>
                        <hr></hr>
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
                                <Button size='middle' className="button__voucher" style={{ fontSize: '15px', width: "20%" }}>Áp dụng</Button>
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
                        <hr></hr>
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
                        <hr></hr>
                        <div className="bottom-bar">
                            <div className="total-box">
                                <span style={{ fontWeight: '600' }}>Tổng tiền tạm tính</span>
                                <div className="price">
                                    <span className="total">4000000</span>
                                </div>
                            </div>
                            <div className="btn-submit">
                                <button className="btn-next" onClick={showConfirmModal}>Đặt hàng</button>
                            </div>
                            <Modal
                                title="Xác nhận đặt hàng"
                                visible={isConfirmModalVisible}
                                onOk={handleConfirmOk}
                                onCancel={handleConfirmCancel}
                                footer={[
                                    <Button key="back" onClick={handleConfirmCancel}>
                                        Hủy
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleConfirmOk}>
                                        Xác nhận
                                    </Button>,
                                ]}>
                                Bạn có chắc chắn muốn đặt hàng?
                            </Modal>
                        </div>
                    </WrapperPaymentInfo>
                </Col>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <FloatButton.BackTop />
            </Row>
            <br></br>
        </div >
    )
}

export default PaymentInfo;