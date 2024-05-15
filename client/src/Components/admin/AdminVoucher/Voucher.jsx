import React, { useState, useEffect } from "react";
import { WrapperHeader } from "../AdminUser/style";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { Dropdown, Menu, Modal, Switch, Tooltip, message } from 'antd';
import axios from "axios";
import Search from "antd/es/input/Search";

import { AppstoreAddOutlined, DeleteOutlined, EditOutlined, AppstoreOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import NewVoucher from "./NewVoucher";
import Loading from "../../LoadingComponents/Loading";
import EditVoucher from "./EditVoucher";


const Voucher = () => {
    const user = useSelector((state) => state.user)
    const headers = {
        token: `Bearers ${user.access_token}`,
    };
    const [voucher, setVoucher] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [voucherId, setVoucherId] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData(currentPage);
        setLoading(false)
    }, [currentPage, reloadData]);
    const fetchData = (page) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/voucher/getVoucher`, {
                headers,
                params: {
                    page: page
                }
            })
            .then((response) => {
                setVoucher(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching vouchers:', error);
                setLoading(false)
            });
    };
    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => {
        setCentredModal(true);
    };
    const closeModal = () => {
        setCentredModal(false);
        setReloadData(!reloadData);
    };
    const [centredModal1, setCentredModal1] = useState(false);

    const toggleOpen1 = (voucherId) => {
        setCentredModal1(true);
        setVoucherId(voucherId);
    };
    const closeModal1 = () => {
        setCentredModal1(false);
        setReloadData(!reloadData);
    };
    const handleDeleteVoucher = (voucherId) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/voucher/deleteVoucher/${voucherId}`, { headers })
            .then((response) => {
                message.success('Xóa voucher thành công');
                setReloadData(!reloadData);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API xóa voucher: ', error);
                message.error('Lỗi khi xóa voucher');
            });
    };

    const handleMenuClick = (e, voucher) => {
        if (e.key === 'edit') {
            toggleOpen1(voucher._id);
        } else if (e.key === 'delete') {
            toggleDeleteConfirmationModal(voucher._id);
        }
    };
    const [deleteConfirmationProductId, setDeleteConfirmationProductId] = useState(null);

    const toggleDeleteConfirmationModal = (voucherId) => {
        setDeleteConfirmationProductId(voucherId);
    };

    const menu = (voucher) => (
        <Menu onClick={(e) => handleMenuClick(e, voucher)}>
            <>
                <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
                <Menu.Item key="delete">Xoá voucher</Menu.Item>
            </>
        </Menu>
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <WrapperHeader>Danh sách voucher</WrapperHeader>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Search style={{ width: '100%' }}
                        placeholder="Tìm kiếm voucher"
                        enterButton />
                </div>
                <div style={{ justifyContent: 'end', width: '50%', display: 'flex' }}>
                    <MDBBtn rounded style={{ backgroundColor: '#B63245' }} onClick={toggleOpen}>
                        Thêm voucher
                    </MDBBtn>
                </div>
            </div>
            <div style={{ marginTop: '15px' }}>
                <Loading isLoading={loading}>
                    <MDBTable bordered align='middle' className='floating-table'>

                        <MDBTableHead>
                            <tr style={{ textAlign: 'center', color: '#fff', backgroundColor: '#B63245' }}>
                                <th scope='col' >Tên voucher</th>
                                <th scope='col'>Mã voucher</th>
                                <th scope='col'>Ngày bắt đầu</th>
                                <th scope='col'>Ngày kết thúc</th>
                                <th scope='col'>Số lượng</th>
                                <th scope='col'>Khuyến mãi/%</th>
                                <th scope='col'>Tối đa</th>
                                <th scope='col'>Thao tác</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {voucher.map(voucherItem => (
                                <tr key={voucherItem._id} style={{ textAlign: 'center' }}>
                                    <td>
                                        <p className='fw-bold mb-1'>{voucherItem.name}</p>
                                    </td>
                                    <td><MDBBadge color="primary" style={{ fontSize: '13px' }} pill>
                                        {voucherItem.code}</MDBBadge></td>
                                    <td>{voucherItem.startDate}</td>
                                    <td>{voucherItem.endDate}</td>
                                    <td>{voucherItem.quantity}</td>
                                    <td>{voucherItem.discount * 100}</td>
                                    <td>{voucherItem.maxPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>  <Dropdown overlay={menu(voucherItem)} >
                                        <Tooltip title="Thực hiện thao tác">
                                            <CaretDownOutlined />
                                        </Tooltip>
                                    </Dropdown></td>
                                </tr>
                            ))}
                        </MDBTableBody>

                    </MDBTable>
                </Loading>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <nav aria-label='Page navigation example'>
                        <MDBPagination className='mb-0' style={{ padding: '10px 20px' }}>
                            <MDBPaginationItem disabled={currentPage === 1}>
                                <MDBPaginationLink style={{ fontSize: '15px' }} href='#' aria-label='Previous' onClick={() => handlePageChange(currentPage - 1)} >
                                    <span aria-hidden='true'>«</span>
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                            {[...Array(totalPages).keys()].map((page) => (
                                <MDBPaginationItem key={page} className={currentPage === page + 1 ? 'active' : ''}>
                                    <MDBPaginationLink style={{ fontSize: '15px' }} href='#' onClick={() => handlePageChange(page + 1)}>
                                        {page + 1}
                                    </MDBPaginationLink>
                                </MDBPaginationItem>
                            ))}
                            <MDBPaginationItem disabled={currentPage === totalPages}>
                                <MDBPaginationLink href='#' style={{ fontSize: '15px' }} aria-label='Next' onClick={() => handlePageChange(currentPage + 1)} >
                                    <span aria-hidden='true'>»</span>
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        </MDBPagination>
                    </nav>
                </div>
            </div>
            <>
                <Modal
                    visible={centredModal}
                    title="Thêm voucher"
                    footer={null}
                    width={1400}
                    closable={false}
                >
                    <NewVoucher closeModal={closeModal} />
                </Modal>
            </>
            <>
                <Modal
                    visible={centredModal1}
                    title="Chỉnh sửa voucher"
                    footer={null}
                    onCancel={closeModal1}
                    width={1400}
                    maskClosable={false}
                >
                    <EditVoucher closeModal={closeModal1} voucherId={voucherId} />
                </Modal>
            </>
            <>
                <Modal
                    title="Xác nhận xoá voucher"
                    visible={deleteConfirmationProductId !== null}
                    onOk={() => {
                        handleDeleteVoucher(deleteConfirmationProductId);
                        setDeleteConfirmationProductId(null); 
                    }}
                    onCancel={() => setDeleteConfirmationProductId(null)} 
                >
                    <p>Bạn có chắc chắn muốn xoá voucher này?</p>
                </Modal>
            </>
        </div>

    );
};

export default Voucher;
