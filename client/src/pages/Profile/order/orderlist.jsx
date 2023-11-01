import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination, message } from 'antd';
import { MDBModalContent, MDBModalDialog } from 'mdb-react-ui-kit';
import OrderDetail from '../orderdetail';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const OrderList = ({ status }) => {
    const user = useSelector((state)=> state.user)
    const [currentPage, setCurrentPage] = useState(1);
    const headers = {
        token: `Bearers ${user.access_token}`,
    };
    const itemsPerPage = 5;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = currentPage * itemsPerPage;

  
    const [orders, setOrders] = useState([]); 
    const [completeOrder, setCompleteOrder] = useState(false); 
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/order/user/${user._id}?status=${status}`)
        .then((response) => {
          setOrders(response.data.data);
        })
        .catch((error) => {
          console.error('Lỗi khi gọi API: ', error);
        });
    }, [status]);
    const handleCompleteOrder = async (orderId ) => {
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/completeOrder/${orderId}`, { newStatus: 'Đơn hàng hoàn thành' },{headers});
          if (response.data.success) {
            const updatedOrderAtStore = orders.filter(order => order._id !== orderId);  
            message.success('Đơn hàng đã hoàn thành');
            setOrders(updatedOrderAtStore); 
          }
        } catch (error) {
          console.error('Lỗi khi xác nhận đơn hàng:', error);
          message.error('Đã xảy ra lỗi khi xác nhận đơn hàng');
        }
      }; 
    return (
        <div>
            {orders.length === 0 ? (
                 <p>Bạn không có đơn hàng nào.</p>
                 ) : (
            orders.map((order) => (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px' }}>
                <div style={{ padding: '10px 10px 0 10px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }} className='pre-order'>
                    <div style={{ background: '#8c52ff', color: '#fff', padding: '10px 10px 0 10px', textAlign: 'right', fontWeight: 600, borderRadius: '4px 4px 0 0' }}>
                        <p>Trạng thái đơn hàng:&nbsp;<span>{order.status}</span></p>
                    </div>
                        {order.items.length > 0 && (
                            <div style={{ display: 'flex', height: 'auto', padding: '10px 10px 10px 0', border: '1px solid #ccc', borderRadius: '0 0 4px 4px' }}>
                                <div style={{ width: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='order-img'>
                                <img src={order.items[0].pictures} style={{ height: 'auto', width: '80%' }}></img>
                                </div>
                                <div style={{ width: "90%" }}>
                                <p style={{ fontWeight: 500 }}>{order.items[0].product.name} {order.items[0].memory}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div className='type' style={{ flex: 1 }}>
                                    <p style={{ margin: 0 }}>Phân loại:&nbsp;<span>{order.items[0].color}</span></p>
                                    <p style={{ margin: 0 }}>x{order.items[0].quantity}</p>
                                    </div>
                                    <div className='price' style={{ flex: 1, textAlign: 'right' }}>
                                    <span style={{ textDecoration: 'line-through' }}>
                                    {order.items[0].productVariant.oldPrice
                                        ? new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(order.items[0].productVariant.oldPrice)
                                        : null
                                    }
                                    </span>
                                    &nbsp;
                                    <span style={{ color: '#ff3300' }}>
                                    {new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND'}).format(order.items[0]?.price)}
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )}
                    <div style={{ padding: '10px', display: 'flex', justifyContent: 'right', alignItems: 'center', gap: '10px' }}>
                        <a style={{ cursor: 'default' }}>Số lượng hàng:&nbsp;
                            <span style={{ color: '#ff3300' }}>{order.items.length}</span></a>
                        <a style={{ cursor: 'default' }}>Thành tiền:&nbsp;
                            <span style={{ color: '#ff3300' }}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND'}).format(order.totalPay)}</span></a>
                        {order.status === 'Đơn hàng đang được giao' && (
                        <Button
                        style={{ background: '#8c52ff', color: '#fff' }}
                        onClick={() => setCompleteOrder(true)}
                      >
                        Đã nhận được hàng
                      </Button>
                        )}
                    <div>
                        <NavLink to={`/order-detail/${order.orderCode}`}><Button style={{ border: '1px solid #8c52ff', color: '#8c52ff' }}>Xem thêm</Button></NavLink>
                    </div>
                    </div>
                </div>
                <Modal
         title="Hoàn thành đơn hàng"
         visible={completeOrder}
         onOk={() => {
           handleCompleteOrder(order._id)
           setCompleteOrder(false); 
         }}
         onCancel={() => setCompleteOrder(false)} 
       >
       <p>Bạn có chắc chắn muốn hoàn thành đơn hàng này</p>
       </Modal>
            </div>
            ))
            )}
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    // total={orders.length}
                    // defaultPageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default OrderList