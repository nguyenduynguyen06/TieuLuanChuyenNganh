import React, { useState, useEffect } from "react";
import { WrapperHeader } from "../AdminUser/style";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button, Dropdown, Input, Menu, Modal, Tooltip, message } from 'antd';
import { AppstoreFilled, CaretDownOutlined, PrinterFilled } from '@ant-design/icons';
import axios from "axios";
import Search from "antd/es/input/Search";
import "./Order.css";
import { useSelector } from "react-redux";
import ProductOrder from "./ProductOrder";
import Loading from "../../LoadingComponents/Loading";
import Invoice from "./Invoice";

const OrderReady = () => {
    const user = useSelector((state) => state.user)
    const headers = {
        token: `Bearer ${user.access_token}`,
    };
    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [orderCode, setOrderCode] = useState('');
    const [orderSubtotal, setOrderSubtotal] = useState('');
    const [orderVoucher, setOrderVoucher] = useState('');
    const [ordertotalPay, setOrderTotalPay] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true)
    const [reason, setReason] = useState('');
    const handleChangeReason = (e) => {
        setReason(e.target.value);
    };

    useEffect(() => {
        setLoading(true);
        fetchOrders(currentPage);
    }, [currentPage]);

    const [triggerSearch, setTriggerSearch] = useState(false);

    const handleSearch = (query) => {
        setLoading(true);
        setSearchQuery(query);
        setTriggerSearch(!triggerSearch);
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            axios.get(`${process.env.REACT_APP_API_URL}/order/searchOrderReady?orderCode=${searchQuery}`, { headers })
                .then((response) => {
                    setSearchResults(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setSearchResults(null);
                    setOrderData([]);
                    console.error('Error searching products:', error);
                    setLoading(false);
                });
        } else {
            setSearchResults(null);
            setLoading(false);
        }
    }, [searchQuery, triggerSearch]);

    const fetchOrders = (page) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/order/getAllOrdersReady?page=${page}`, { headers })
            .then((response) => {
                setOrderData(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API: ', error);
                setLoading(false)
            });
    };

    const handleShippingMethodChange = (e) => {
        setSelectedShippingMethod(e.target.value);
    };

    const handleConfirm = () => {
        setLoading(true);
        fetchOrdersWithShippingMethod(selectedShippingMethod, currentPage);
    };

    const fetchOrdersWithShippingMethod = (shippingMethod, page) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/order/getAllOrdersReady?page=${page}&shippingMethod=${shippingMethod}`, { headers })
            .then((response) => {
                setOrderData(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
                setSearchResults(null);
                setSearchQuery('');
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.error('Lỗi khi gọi API: ', error);
            });
    };

    const handleMenuClick = (e, order) => {
        if (order.status === 'Đang chuẩn bị đơn hàng') {
            if (e.key === 'confirm') {
                setSelectedOrder(order);
                setConfirmModalVisible(true);
            } else if (e.key === 'cancel') {
                setSelectedOrder(order);
                setCancelModalVisible(true);
            }
        }
    };

    const onClose = () => {
        setConfirmModalVisible(false);
        setSelectedOrder(null);
    };

    const onConfirm = () => {
        updateOrder(selectedOrder._id);
        setConfirmModalVisible(false);
        setSelectedOrder(null);
    };

    const onClose1 = () => {
        setCancelModalVisible(false);
        setSelectedOrder(null);
    };

    const onConfirm1 = (reason) => {
        cancelOrder(selectedOrder._id, reason);
        setCancelModalVisible(false);
        setSelectedOrder(null);
        setReason('')
    };

    const updateOrder = (orderId) => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/order/updateOrder/${orderId}`, { newStatus: 'Đang giao hàng' }, { headers })
            .then((response) => {
                message.success('Chuyển giao hàng thành công')
                fetchOrders(currentPage);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật đơn hàng: ', error);
            });
    };

    const cancelOrder = (orderId, reason) => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/order/cancelOrderWithReason/${orderId}`, { reason }, { headers })
            .then((response) => {
                message.success('Huỷ thành công')
                fetchOrders(currentPage);
            })
            .catch((error) => {
                console.error('Lỗi khi huỷ đơn hàng: ', error);
            });
    };

    const menu = (order) => (
        <Menu onClick={(e) => handleMenuClick(e, order)}>
            <>
                <Menu.Item key="confirm">Giao hàng</Menu.Item>
                <Menu.Item key="cancel">Huỷ đơn</Menu.Item>
            </>
        </Menu>
    );
    const [centredModal2, setCentredModal2] = useState(false);

    const toggleOpen2 = (order) => {
        setOrderCode(order.orderCode)
        setSelectedOrderItems(order.items);
        setOrderVoucher(order.voucher)
        setOrderSubtotal(order.subTotal)
        setOrderTotalPay(order.totalPay)
        setCentredModal2(true);
    };
    const closeModal2 = () => {
        setCentredModal2(false);
    };
    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = (order) => {
        setOrderCode(order.orderCode)
        setSelectedOrderItems(order);
        setCentredModal(true);
    };
    const closeModal = () => {
        setCentredModal(false);
    };
    return (
        <div>
            <WrapperHeader>Danh sách đơn hàng</WrapperHeader>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Search style={{ width: '100%' }}
                        placeholder="Tìm kiếm đơn hàng"
                        enterButton
                        onSearch={handleSearch}
                    />
                </div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>

                    <select
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}
                        onChange={handleShippingMethodChange}
                    >
                        <option value="">Tất cả đơn hàng</option>
                        <option value="Giao tận nơi">Giao tận nơi</option>
                        <option value="Nhận tại cửa hàng">Nhận tại cửa hàng</option>
                    </select>
                </div>
                <div>
                    <MDBBtn rounded style={{ backgroundColor: '#0000FF' }} onClick={handleConfirm}>
                        Xác nhận
                    </MDBBtn>
                </div>
            </div>

            <div style={{ marginTop: '15px', overflowY: 'auto', overflowX: 'auto', scrollbarWidth: 'thin' }}>
                <Loading isLoading={loading}>
                    <MDBTable bordered align='middle' className='floating-table'>
                        <MDBTableHead>
                            <tr style={{ textAlign: 'center', color: '#fff', backgroundColor: '#B63245' }}>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Mã đơn hàng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px' }}>Khách hàng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Số điện thoại</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '250px' }}>Địa chỉ</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px' }}>Hình thức giao hàng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Tình trạng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Tình trạng thanh toán</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '250px' }}>Phương thức thanh toán</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px' }}>Thời gian đặt hàng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Sản phẩm</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Thao tác</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Hoá đơn</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>

                            {(!searchResults && orderData.length === 0) ? (
                                <tr style={{ textAlign: 'center' }}>
                                    <td colSpan="10">Không có đơn hàng</td>
                                </tr>
                            ) : searchResults ? (
                                <tr style={{ textAlign: 'center' }}>
                                    <td><p className='fw-bold mb-1'>{searchResults.orderCode}</p></td>
                                    <td>{searchResults.userName}</td>
                                    <td><p className='fw-normal mb-1'>   {searchResults.userPhone}</p></td>
                                    <td>{searchResults.address}</td>
                                    <td><MDBBadge color='primary' pill style={{ fontSize: '13px' }}>{searchResults.shippingMethod}</MDBBadge></td>
                                    <td><MDBBadge color='warning' pill style={{ fontSize: '13px' }}>{searchResults.status}</MDBBadge></td>
                                    <td><MDBBadge color='success' pill style={{ fontSize: '13px' }}>{searchResults.isPay}</MDBBadge></td>
                                    <td>{searchResults.paymentMethod}</td>
                                    <td>{searchResults.createDate}</td>
                                    <td>
                                        <Tooltip title="Danh sách sản phẩm của đơn hàng">
                                            <AppstoreFilled onClick={() => toggleOpen2(searchResults)} />
                                        </Tooltip>
                                    </td>
                                    <td>
                                        <Dropdown overlay={menu(searchResults)} >
                                            <Tooltip title="Thực hiện thao tác">
                                                <CaretDownOutlined />
                                            </Tooltip>
                                        </Dropdown>
                                    </td>
                                    <td>
                                        <Tooltip title="Xem hoá đơn">
                                            <PrinterFilled onClick={() => toggleOpen(searchResults)} />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ) : (
                                orderData.map(order => (
                                    <tr key={order._id} style={{ textAlign: 'center' }}>
                                        <td><p className='fw-bold mb-1'>{order.orderCode}</p></td>
                                        <td>{order.userName}</td>
                                        <td><p className='fw-normal mb-1'>   {order.userPhone}</p></td>
                                        <td >{order.address}</td>
                                        <td><MDBBadge color='primary' pill style={{ fontSize: '13px' }}>{order.shippingMethod}</MDBBadge></td>
                                        <td><MDBBadge color='warning' pill style={{ fontSize: '13px' }}>{order.status}</MDBBadge></td>
                                        <td><MDBBadge color='success' pill style={{ fontSize: '13px' }}>{order.isPay}</MDBBadge></td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{order.createDate}</td>
                                        <td>
                                            <Tooltip title="Danh sách sản phẩm của đơn hàng">
                                                <AppstoreFilled onClick={() => toggleOpen2(order)} />
                                            </Tooltip>
                                        </td>
                                        <td>
                                            <Dropdown overlay={menu(order)} >
                                                <Tooltip title="Thực hiện thao tác">
                                                    <CaretDownOutlined />
                                                </Tooltip>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <Tooltip title="Xem hoá đơn">
                                                <PrinterFilled onClick={() => toggleOpen(order)} />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </MDBTableBody>
                    </MDBTable>
                </Loading>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <nav aria-label='Page navigation example'>
                    <MDBPagination className='mb-0' style={{ padding: '10px 20px' }}>
                        <MDBPaginationItem disabled={currentPage === 1}>
                            <MDBPaginationLink
                                href='#'
                                style={{ fontSize: '15px' }}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                aria-label='Previous'
                            >
                                <span aria-hidden='true'>«</span>
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <MDBPaginationItem active={currentPage === page} key={page}>
                                <MDBPaginationLink
                                    href='#'
                                    style={{ fontSize: '15px' }}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        ))}

                        <MDBPaginationItem disabled={currentPage === totalPages}>
                            <MDBPaginationLink
                                href='#'
                                style={{ fontSize: '15px' }}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                aria-label='Next'
                            >
                                <span aria-hidden='true'>»</span>
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    </MDBPagination>
                </nav>
            </div>

            <>
                <Modal
                    visible={centredModal2}
                    footer={null}
                    onCancel={closeModal2}
                    width={1400}
                    maskClosable={false}
                >
                    <ProductOrder closeModal={closeModal2} items={selectedOrderItems} orderCode={orderCode} orderVoucher={orderVoucher} orderSubtotal={orderSubtotal} ordertotalPay={ordertotalPay} />
                </Modal>
            </>
            <>
                <Modal
                    visible={centredModal}
                    footer={null}
                    onCancel={closeModal}
                    width={'210mm'}
                    maskClosable={false}
                >
                    <Invoice closeModal={closeModal} order={selectedOrderItems} />
                </Modal>
            </>
            {selectedOrder && (
                <Modal
                    title="Xác nhận đơn hàng"
                    visible={confirmModalVisible}
                    onCancel={onClose}
                    footer={[
                        <Button key="back" onClick={onClose}>
                            Huỷ
                        </Button>,
                        <Button key="submit" type="primary" onClick={onConfirm}>
                            Xác nhận
                        </Button>,
                    ]}
                >
                    Bạn có muốn giao đơn hàng {selectedOrder.orderCode} này không?
                </Modal>
            )}
            {selectedOrder && (
                <Modal
                    title="Huỷ đơn hàng"
                    visible={cancelModalVisible}
                    onCancel={onClose1}
                    footer={[
                        <Button key="back" onClick={onClose1}>
                            Huỷ
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => onConfirm1(reason)} disabled={!reason}>
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <p>Bạn có muốn huỷ đơn hàng {selectedOrder.orderCode} này không?</p>
                    <Input placeholder="Nhập lý do huỷ đơn" value={reason} onChange={handleChangeReason} />
                </Modal>
            )}
        </div>
    );
};

export default OrderReady;
