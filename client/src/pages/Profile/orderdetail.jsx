import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Input, Modal, Row, message, Button } from "antd";
import ReviewModal from "./review";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { WrapperDetailOrder } from "./order/style";
import Header from "../../Components/Header/header";
import { MDBBtn, MDBModalContent, MDBModalDialog } from "mdb-react-ui-kit";
import moment from 'moment';
import { useSelector } from "react-redux";
import Loading from "../../Components/LoadingComponents/Loading";

const OrderDetail = () => {
    const { orderCode } = useParams();
    const user = useSelector((state) => state.user)
    const [completeOrder, setCompleteOrder] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [centredModal1, setCentredModal1] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const toggleShow1 = () => setCentredModal1(!centredModal1);
    const handleReviewClick = (productId) => {
        toggleShow1();
        setCurrentProductId(productId);
    };
    const [orderDetails, setOrderDetails] = useState(null);
    const [reason, setReason] = useState('');
    const handleChangeReason = (e) => {
        setReason(e.target.value);
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/oderDetails/${orderCode}?userId=${user._id}`)
            .then((response) => {
                setOrderDetails(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API: ', error);
                setLoading(false)
            });
    }, [orderCode, user]);
    const updateOrderDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/order/oderDetails/${orderCode}?userId=${user._id}`)
            .then((response) => {
                setOrderDetails(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API: ', error);
                setLoading(false)
            });
    };

    const goBack = () => {
        window.history.back();
    };
    const handleCompleteOrder = async (orderCode) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/completeOrderUser/${orderCode}?userId=${user._id}`);
            if (response.data.success) {
                message.success('Hoàn thành đơn hàng thành công');
                window.history.back();
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận đơn hàng:', error);
            message.error('Đã xảy ra lỗi khi xác nhận đơn hàng');
        }
    };
    const onClose1 = () => {
        setCancelOrder(false);
        setReason('');
    };



    const handleCancel = async (reason) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/cancel/${orderCode}?userId=${user._id}`, { reason });
            if (response.data.success) {
                message.success('Huỷ đơn hàng thành công');
                onClose1();
                window.history.back();
            } else {
                message.error(response.data.error || 'Đã xảy ra lỗi khi huỷ đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận đơn hàng:', error);
            message.error('Đã xảy ra lỗi khi xác nhận đơn hàng');
        }
    };
    const handlePayment = () => {
        const paymentData = {
            orderCode: orderCode,
            amount: orderDetails.totalPay,
            language: '',
            bankCode: '',
            orderinfo: `${orderDetails.userName} thanh toán, mã hoá đơn là: `
        };

        axios.post(`${process.env.REACT_APP_API_URL}/VNPAY/create_payment_url`, paymentData)
            .then(response => {
                window.location.href = response.data.data;
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <Header></Header>
            <Loading isLoading={loading}>
                <WrapperDetailOrder>
                    <div className="mainContainer" >
                        <div>
                            <div className="nav">
                                <button className="btn-back" style={{ display: 'flex', alignItems: 'center' }} onClick={goBack}>
                                    <ArrowLeftOutlined />&nbsp;Quay lại
                                </button>
                                <div className="pagetitle" >Thông tin đơn hàng</div>
                            </div>
                            {orderDetails && (
                                <div>
                                    <div className="statusord">
                                        <p>Tình trạng đơn hàng:&nbsp;
                                            <span>{orderDetails.status}</span>
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                                        <label style={{ margin: '0 0 5px 0', fontWeight: 600 }}>Địa chỉ nhận hàng:</label>
                                        <p style={{ margin: 0 }}>{orderDetails.userName}</p>
                                        <p style={{ margin: 0 }}>{orderDetails.userPhone}</p>
                                        <p style={{ margin: 0 }}>{orderDetails.address}</p>
                                    </div>
                                    {orderDetails.items.map((item, index) => (
                                        <div key={index} className='pre-order'>
                                            <div className="img-con">
                                                <img className='img-product' src={item.pictures} alt={`Product ${index + 1}`} />
                                            </div>
                                            <div className="inf-con">
                                                <div style={{ width: '100%' }}>
                                                    <a href="/" className="pdname" style={{ margin: 0, color: '#000' }}>{item.product.name} {item.memory}</a>
                                                </div>
                                                <div >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <p style={{ margin: 0 }}>Phân loại:&nbsp;<span>{item.color}</span></p>
                                                            <p style={{ margin: 0, textAlign: 'right' }}>x<span>{item.quantity}</span></p>
                                                        </div>
                                                        <p style={{ margin: 0, textAlign: 'right', color: '#ff3300' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right' }}>
                                                        {orderDetails.completeDate && (
                                                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'right' }}>
                                                                <p style={{ margin: 0 }}>Hạn bảo hành:</p>
                                                                <span style={{ margin: 0 }}>
                                                                    {item.change?.dateChange ? (
                                                                        moment(item.change?.dateChange, 'DD/MM/YYYY HH:mm:ss')
                                                                            .add(item.product.warrantyPeriod, 'months')
                                                                            .format('DD-MM-YYYY')
                                                                    ) : (
                                                                        moment(orderDetails.completeDate, 'DD/MM/YYYY HH:mm:ss')
                                                                            .add(item.product.warrantyPeriod, 'months')
                                                                            .format('DD-MM-YYYY')
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {orderDetails && orderDetails.status === "Đã hoàn thành" ? (
                                                            item.rated ? (
                                                                <span style={{ color: "#C13346", cursor: 'default', textAlign: 'right' }}>Đã đánh giá</span>
                                                            ) : (
                                                                <a style={{ color: "#C13346", cursor: 'pointer', textAlign: 'right' }} onClick={() => handleReviewClick(item.product)}> Đánh giá</a>
                                                            )
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <p style={{ textAlign: 'right', padding: '10px', background: '#fff', border: '1px solid #ff3300', borderRadius: '4px', fontWeight: 600 }}>
                                        Thành tiền:&nbsp;<span style={{ color: "#ff3300" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDetails.totalPay)}</span>
                                    </p>
                                    <div style={{ padding: '10px', border: '1px solid #efefef', borderRadius: '4px' }}>
                                        <h6 style={{ margin: '0 0 5px 0' }}>Phương thức thanh toán:</h6>
                                        <p>{orderDetails.paymentMethod}</p>
                                    </div>
                                    <div style={{ padding: '10px', background: '#fff', border: '1px solid #efefef', borderRadius: '4px' }}>
                                        <p>Mã đơn hàng:&nbsp;<span>{orderDetails.orderCode}</span></p>
                                        <p>Thời gian đặt hàng:&nbsp; <span>{orderDetails.createDate}</span></p>
                                        <p>Thời gian hoàn thành đơn hàng:&nbsp; <span>{orderDetails?.completeDate}</span></p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {orderDetails && (orderDetails.status === "Chờ xác nhận" && orderDetails.paymentMethod !== "Thanh toán khi nhận hàng" && orderDetails.isPay === 'Đang chờ thanh toán') && (
                                <MDBBtn style={{ backgroundColor: "#C13346", width: '49%' }} onClick={handlePayment}>Thanh toán đơn hàng</MDBBtn>
                            )}
                            {orderDetails && (orderDetails.status === "Chờ xác nhận" && orderDetails.isPay === 'Đang chờ thanh toán' || orderDetails.status === "Đang chuẩn bị đơn hàng"  && orderDetails.isPay === 'Đang chờ thanh toán') && (
                                <MDBBtn style={{ backgroundColor: "#C13346", width: '49%' }} onClick={() => setCancelOrder(true)}>Yêu cầu hủy/trả hàng</MDBBtn>
                            )}
                            {orderDetails && orderDetails.status === "Đã giao hàng" && (
                                <MDBBtn style={{ color: '#C13346', backgroundColor: '#FFF', width: '49%' }} onClick={() => setCompleteOrder(true)}>Đã nhận được hàng</MDBBtn>
                            )}
                            <Modal
                                title="Hoàn thành đơn hàng"
                                visible={completeOrder}
                                onOk={() => {
                                    handleCompleteOrder(orderCode)
                                    setCompleteOrder(false);
                                }}
                                onCancel={() => setCompleteOrder(false)}
                            >
                                <p>Bạn có chắc chắn muốn hoàn thành đơn hàng này</p>
                            </Modal>
                            <Modal
                                title="Huỷ đơn hàng"
                                visible={cancelOrder}
                                onCancel={onClose1}
                                footer={[
                                    <Button key="back" onClick={onClose1}>
                                        Huỷ
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={() => handleCancel(reason)} disabled={!reason}>
                                        Xác nhận
                                    </Button>,
                                ]}
                            >
                                <p>Bạn có muốn huỷ đơn hàng {orderCode} này không?</p>
                                <Input placeholder="Nhập lý do huỷ đơn" value={reason} onChange={handleChangeReason} />
                            </Modal>
                        </div>
                        <Modal
                            visible={centredModal1}
                            onCancel={toggleShow1}
                            footer={null}>
                            <MDBModalDialog size='xl'>
                                <MDBModalContent>
                                    <ReviewModal productId={currentProductId} onClose={() => { toggleShow1(); updateOrderDetails(); }} orderCode={orderCode}></ReviewModal>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </Modal>
                    </div>
                </WrapperDetailOrder>
            </Loading>
        </div>
    );
}

export default OrderDetail;
