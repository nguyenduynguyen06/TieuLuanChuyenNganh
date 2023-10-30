import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { MDBModalContent, MDBModalDialog } from 'mdb-react-ui-kit';
import OrderDetail from '../orderdetail';


const OrderList = () => {
    const [centredModal3, setCentredModal3] = useState(false);
    const toggleShow3 = () => setCentredModal3(!centredModal3);


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px' }}>
                <div style={{ padding: '10px 10px 0 10px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }} className='pre-order'>
                    <div style={{ background: '#8c52ff', color: '#fff', padding: '10px 10px 0 10px', textAlign: 'right', fontWeight: 600, borderRadius: '4px 4px 0 0' }}>
                        <p>Trạng thái đơn hàng:&nbsp;<span>Đang giao</span></p>
                    </div>
                    <div style={{ display: 'flex', height: 'auto', padding: '10px 10px 10px 0', border: '1px solid #ccc', borderRadius: '0 0 4px 4px' }}>
                        <div style={{ width: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='order-img'>
                            <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '80%' }}></img>
                        </div>
                        <div style={{ width: "90%" }}>
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
                <div style={{ padding: '10px 10px 0 10px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }} className='pre-order'>
                    <div style={{ background: '#8c52ff', color: '#fff', padding: '10px 10px 0 10px', textAlign: 'right', fontWeight: 600, borderRadius: '4px 4px 0 0' }}>
                        <p>Trạng thái đơn hàng:&nbsp;<span>Đang giao</span></p>
                    </div>
                    <div style={{ display: 'flex', height: 'auto', padding: '10px 10px 10px 0', border: '1px solid #ccc', borderRadius: '0 0 4px 4px' }}>
                        <div style={{ width: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='order-img'>
                            <img src='https://vuatao.vn/wp-content/uploads/2022/09/Untitled-4-1.png' style={{ height: 'auto', width: '80%' }}></img>
                        </div>
                        <div style={{ width: "90%" }}>
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
        </div>

    )
}

export default OrderList