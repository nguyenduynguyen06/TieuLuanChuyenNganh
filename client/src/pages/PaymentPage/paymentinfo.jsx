import React, { useEffect, useState } from "react";
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
import { Button, Cascader, Col, Row, Modal, FloatButton, message } from "antd";
import Header from "../../Components/Header/header";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux";

const PaymentInfo = () => {
    const user1 = useSelector((state) => state.user)
    const [total, setTotal] = useState(0);
    const calculateTotalPrice = (cartData) => {
        return cartData.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      };
    const [order, setOrder] = useState(
        {
            paymentMethod: 'Thanh toán khi nhận hàng',
            shippingMethod: 'Giao tận nơi'
        }
    );
    useEffect(() => {
        setOrder(prevOder => ({
          ...prevOder,
          userName: user1.fullName,
          userEmail: user1.email,
          address: user1.addRess,
          userPhone: user1.phone_number,
        }));
      }, [user1]);

      const addOrder = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/order/addOrder/${user1._id}`, order)
          .then((response) => {
           window.location.href = `/order-success`
          })
          .catch((error) => {
            message.error('Không có sản phẩm nào!');
          });
      };
      
    const goBack = () => {
        window.history.back();
    };



    const [selectedPayment, setSelectedPayment] = useState('atStore');
    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
        if (e.target.value === 'atStore') {
            setOrder((prevOrder) => ({
                ...prevOrder,
                paymentMethod: 'Thanh toán khi nhận hàng',
            }));
        } else if (e.target.value === 'paypal') {
            setOrder((prevOrder) => ({
                ...prevOrder,
                paymentMethod: 'Paypal',
            }));
        }
    };

    const onChange = event => {
        event.preventDefault();
        setOrder({ ...order, [event.target.name]: event.target.value })
    }
    const [deliveryOption, setDeliveryOption] = useState('homeDelivery'); 


    const handleRadioChange = (e) => {
      setDeliveryOption(e.target.value);
      if (e.target.value === 'homeDelivery') {
        setOrder((prevOrder) => ({
          ...prevOrder,
          shippingMethod: 'Giao tận nơi',
          address: user1.addRess,
        }));
      }
    };
    
    const pickStore = (value) => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            shippingMethod: 'Nhận tại cửa hàng',
            address: value[0],
          }));
    };
    const options = [
        {
            value: 'Chi nhánh 1, Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            label: 'Chi nhánh 1, Số 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
        },
        {
            value: 'Chi nhánh 2',
            label: 'Hà Nội',
        },
    ];
    useEffect(() => {
        if (user1 && user1._id) {
          axios.get(`${process.env.REACT_APP_API_URL}/cart/getToCart/${user1._id}`)
            .then((response) => {
              const cartData = response.data.data;
              setData(cartData);
              const totalPrice = calculateTotalPrice(cartData);
              setTotal(totalPrice);
              setOrder(prevOder => ({
                ...prevOder,
                subTotal: totalPrice,
                totalPay: totalPrice
              }));
            })
            .catch((error) => {
              console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
            });
        }
      }, [user1]);
      const[data,setData] = useState(null);
      const [vouchercode, setVoucherCode] = useState('');
      const [totalVoucher,settotalVoucher] = useState(null);
      const checkVoucher = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}/voucher/useVoucher`, data)
          .then((response) => {
            if (response.data.success) {
              const voucher = response.data.data
              setOrder(prevOder => ({
                ...prevOder,
                totalPay: total - (total * voucher.discount),
                vouchercode: voucher.code
              }));
              settotalVoucher(total - (total * voucher.discount))
              message.success('Áp dụng voucher thành công')
            } else {
              message.error(response.data.error);
            }
          })
          .catch((error) => {
            message.error('Mã voucher sai');
          });
      };
      
    return (
        <div style={{ background: '#efefef' }}>
            <Header />
            <br></br>
            <Row>
                <Col style={{ width: '20%', paddingLeft: '10px', overflow: 'hidden' }}>
                </Col>
                <Col style={{ width: '60%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <WrapperPaymentInfo>
                    <form onSubmit={addOrder}>
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
                                    {data && data.map((item) => (
                                    <div className="item" key={item.product._id}>
                                        <img className='item__img' src={item.pictures} alt={item.product.name} />
                                        <div className="item-info">
                                        <p className="item-name">{item.product.name} - {item.memory}</p>
                                        <p className="item-name">{item.color}</p>
                                        <div className="item-price">
                                            <div>
                                            <div className="box-info__box-price">
                                                <p className="product__price--show">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', }).format(item.price)}</p>
                                                {item.productVariant.oldPrice && (
                                                <p className="product__price--through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', }).format(item.productVariant.oldPrice)}</p>
                                                )}
                                            </div>
                                            </div>
                                            <p>Số lượng : &nbsp;
                                            <span style={{ color: 'red' }}>{item.quantity}</span>
                                            </p>
                                            <p>Bảo hành : &nbsp;
                                            <span style={{ color: 'red' }}>{item.product.warrantyPeriod} tháng</span>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>

                            <hr></hr>
                            <div className="block-customer">
                                <p>Thông tin khách hàng</p>
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Họ và tên' name="userName" value={order.userName} onChange={onChange} type='text' tabIndex="1" />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="userPhone" value={order.userPhone} onChange={onChange} type='text' tabIndex="3" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Email' name="userEmail" value={order.userEmail} onChange={onChange} type='email' tabIndex="4" />
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
                                            <MDBInput style={{ marginTop: '10px' }} wrapperClass='mb-4' label='Địa chỉ' name="address" value={order.address} onChange={onChange} type='text' tabIndex="2" />
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
                                                    options={options}
                                                    onChange={pickStore}
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
                                    name="vouchercode"
                                    value={vouchercode}
                                    onChange={(e) => setVoucherCode(e.target.value)} 
                                    type='text'
                                    style={{ width: '100%' }}
                                    tabIndex="5"
                                />
                                </div>
                                <Button
                                size='middle'
                                className="button__voucher"
                                style={{ fontSize: '15px', width: "20%" }}
                                onClick={() => checkVoucher({ code: vouchercode })} 
                                >
                                Áp dụng
                                </Button>
                            </div>
                            <div className="info-quote">
                                <div className="info-quote__block">
                                    <div className="quote-block__item">
                                        <p className="quote-block__title">Tiền hàng (Tạm tính) </p>
                                        <p className="quote-block__value"> <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF3300' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency',currency: 'VND',}).format(total)}</span></p>
                                    </div>
                                    <div className="quote-block__item">
                                        <p className="quote-block__title">Phí vận chuyển </p>
                                        <p className="quote-block__value">Miễn phí</p>
                                    </div>
                                </div>
                                <div className="info-quote__bottom">
                                    <p className="quote-bottom__title">Tổng tiền </p>
                                    <p className="quote-bottom__value">
                                    {totalVoucher ? (
                                        <del style={{ fontSize: '17px'}}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)} <br/>
                                        </del>
                                    ) : (
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF3300' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                        </span>
                                    )}
                                    {totalVoucher && (
                                        <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF3300' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalVoucher)}
                                        </span>
                                    )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="payment-quote">
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="atStore"
                                        checked={selectedPayment === 'atStore'}
                                        onChange={handlePaymentChange}
                                    />
                                  &nbsp; Thanh toán khi nhận hàng
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
                                     &nbsp; Paypal
                                </label>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="bottom-bar">
                            <div className="btn-submit">
                                <button className="btn-next" type="submit">Đặt hàng</button>
                            </div>
                        
                          
                        </div>
                            </form>
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