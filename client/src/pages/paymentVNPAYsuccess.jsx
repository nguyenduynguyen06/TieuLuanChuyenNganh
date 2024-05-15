import React, { useEffect, useState } from 'react';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PaymentSuccess = () => {
    const user = useSelector((state) => state.user);
    const headers = {
        token: `Bearers ${user.access_token}`,
    };
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [transactionData, setTransactionData] = useState(null);
    useEffect(() => {
        fetch(`/api/VNPAY/vnpay_return?${params}`)
            .then(response => response.json())
            .then(data => 
                setTransactionData(data)
                )
            .catch(error => console.error('Lỗi khi lấy dữ liệu từ server:', error));
    }, [user]);

    const containerStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };

    const iconStyle = {
        color: transactionData && transactionData.vnp_ResponseCode === '00' ? 'green' : 'red',
        fontSize: '4rem',
    };

    if (!transactionData) {
        return (
            <div className="container" style={containerStyle}>
                <div style={contentStyle}>
                    <p style={{ fontSize: '2rem' }}>Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }
    const colors1 = ['#B63245', '#A45865'];

    return (
        <div className="container" style={containerStyle}>
            <Row>
                {transactionData.vnp_ResponseCode === '00' ? (
                    <CheckCircleOutlined style={iconStyle} />
                ) : (
                    <CloseCircleOutlined style={iconStyle} />
                )}
            </Row>
            <p style={{ fontSize: '2rem', color: iconStyle.color }}>
                {transactionData.vnp_ResponseCode === '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
            </p>

            <div style={contentStyle}>
                <p style={{ fontSize: '1.25rem' }}>Mã giao dịch: {transactionData.vnp_TransactionNo}</p>
                <p style={{ fontSize: '1.25rem' }}>Nội dung thanh toán: {transactionData.vnp_OrderInfoFormatted}</p>
                <p style={{ fontSize: '1.25rem' }}>Số tiền giao dịch: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(transactionData.vnp_Amount / 100)}</p>
                <p style={{ fontSize: '1.25rem' }}>Ngân hàng giao dịch: {transactionData.vnp_BankCode}</p>
                <p style={{ fontSize: '1.25rem' }}>Ngày tạo hoá đơn: {transactionData.vnp_PayDate}</p>
            </div>
            <Button href='/profile'>Xem đơn hàng
            </Button>
        </div>
    );
}

export default PaymentSuccess;
