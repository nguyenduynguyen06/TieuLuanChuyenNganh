import React, { useState, useEffect } from "react";
import { WrapperHeader } from "../AdminUser/style";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button, Dropdown, Input, Menu, Modal, Tooltip } from 'antd';
import { AppstoreFilled, CaretDownOutlined } from '@ant-design/icons';
import axios from "axios";
import Search from "antd/es/input/Search";
import "./Order.css";
import { useSelector } from "react-redux";
import ProductOrder from "./ProductOrder";
import Loading from "../../LoadingComponents/Loading";

const OrderCanCel = () => {
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
    const [loading, setLoading] = useState(true)

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
            axios.get(`${process.env.REACT_APP_API_URL}/order/searchOrderCancel?orderCode=${searchQuery}`, { headers })
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
            .get(`${process.env.REACT_APP_API_URL}/order/getAllOrdersCancel?page=${page}`, { headers })
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
            .get(`${process.env.REACT_APP_API_URL}/order/getAllOrdersCancel?page=${page}&shippingMethod=${shippingMethod}`, { headers })
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

            <div style={{ marginTop: '15px', overflowY: 'auto', overflowX: 'auto', border:'1px solid #eee', boxShadow:'1px 1px #eee' }}>
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
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '250px' }}>Lý do huỷ</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px' }}>Thời gian đặt hàng</th>
                                <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Sản phẩm</th>
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
                                    <td>{searchResults.reasonCancelled ? searchResults.reasonCancelled : ''}</td>
                                    <td>{searchResults.createDate}</td>
                                    <td>
                                        <Tooltip title="Danh sách sản phẩm của đơn hàng">
                                            <AppstoreFilled onClick={() => toggleOpen2(searchResults)} />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ) : (
                                orderData.map(order => (
                                    <tr key={order._id} style={{ textAlign: 'center' }}>
                                        <td><p className='fw-bold mb-1'>{order.orderCode}</p></td>
                                        <td>{order.userName}</td>
                                        <td><p className='fw-normal mb-1'>   {order.userPhone}</p></td>
                                        <td>{order.address}</td>
                                        <td><MDBBadge color='primary' pill style={{ fontSize: '13px' }}>{order.shippingMethod}</MDBBadge></td>
                                        <td><MDBBadge color='warning' pill style={{ fontSize: '13px' }}>{order.status}</MDBBadge></td>
                                        <td>{order.reasonCancelled ? order.reasonCancelled : ''}</td>
                                        <td>{order.createDate}</td>
                                        <td>
                                            <Tooltip title="Danh sách sản phẩm của đơn hàng">
                                                <AppstoreFilled onClick={() => toggleOpen2(order)} />
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

        </div>
    );
};

export default OrderCanCel;
