import React, { useState, useEffect } from "react";
import { WrapperHeader } from "../AdminUser/style";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { Modal, Switch, Tooltip, message } from 'antd';
import axios from "axios";
import Search from "antd/es/input/Search";
import { useSelector } from "react-redux";
import { Form } from 'antd';


const User = () => {
    const user = useSelector((state) => state.user)
    const [form] = Form.useForm();
    const headers = {
        token: `Bearers ${user.access_token}`,
    };
    const [userData, setUserData] = useState([]);
    const [reloadUserData, setReloadUserData] = useState(false);
    const [userId, setUserId] = useState(null)
    const [deleteConfirmationUserId, setDeleteConfirmationUserId] = useState(null);

    const toggleDeleteConfirmationModal = (userId) => {
        setDeleteConfirmationUserId(userId);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`, { headers })
            .then((response) => {
                const filteredUsers = response.data.data.filter(user => user.role_id !== 1);
                setUserData(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleToggleHide = (userId, checked) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, { isBlocked: checked }, { headers })
            .then((response) => {
                const updatedUser = {
                    ...userData.find(user => user._id === userId),
                    isBlocked: checked,
                };
                const updatedUsers = userData.map(user =>
                    user._id === userId ? updatedUser : user
                );
                setUserData(updatedUsers);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật người dùng: ', error);
            });
    };
    const handleToggleBlocked = (userId, checked) => {
        const headers = {
            token: `Bearers ${user.access_token}`,
        };
        axios.post(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, {
            isBlocked: checked
        }, { headers })
            .then((response) => {
                const updatedUser = {
                    ...userData.find(user => user._id === userId),
                    isBlocked: checked,
                };
                const updatedUsers = userData.map(user =>
                    user._id === userId ? updatedUser : user
                );
                setUserData(updatedUsers);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật tài khoản: ', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/user/delete/${userId}`, { headers })
            .then((response) => {
                const updatedUsers = userData.filter(user => user._id !== userId);
                message.success('Xoá người dùng thành công')
                setUserData(updatedUsers);
            })
            .catch((error) => {
                console.error('Lỗi khi xóa người dùng: ', error);
            });
    };

    return (
        <div>
            <WrapperHeader>Danh sách người dùng</WrapperHeader>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Search style={{ width: '100%' }}
                        placeholder="Tìm kiếm người dùng"
                        enterButton />
                </div>
            </div>

            <div style={{ marginTop: '15px' }}>
                <MDBTable bordered align='middle' className='floating-table' style={{ overflow: 'auto' }}>

                    <MDBTableHead>
                        <tr style={{ textAlign: 'center', color: '#fff', backgroundColor: '#B63245' }}>
                            <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px'  }}>Tên người dùng</th>
                            <th scope='col' style={{ verticalAlign: 'middle' }}>Số điện thoại</th>
                            <th scope='col' style={{ verticalAlign: 'middle' }}>Email</th>
                            <th scope='col' style={{ verticalAlign: 'middle', minWidth: '200px' }}>Địa chỉ</th>
                            <th scope='col' style={{ verticalAlign: 'middle', minWidth: '150px' }}>Khóa/Mở khóa</th>
                            <th scope='col' style={{ verticalAlign: 'middle' }}>Xóa</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {userData.map(user => (
                            <tr key={user._id} style={{ textAlign: 'center' }}>
                                <td>
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{user.fullName}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className='ms-3'>
                                        <p className='mb-1'>{user.phone_number}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className='ms-3'>
                                        <p className='mb-1'>{user.email}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className='ms-3'>
                                        <p className='mb-1'>{user.addRess}</p>
                                    </div>
                                </td>
                                <td>
                                    <MDBBtn color='link' rounded size='sm'>
                                        <Switch checked={!user.isBlocked} onChange={(checked) => handleToggleBlocked(user._id, !checked)} />
                                    </MDBBtn>
                                </td>
                                <td>
                                    <Tooltip title="Xóa">
                                        <MDBBtn color='danger' onClick={() => toggleDeleteConfirmationModal(user._id)} >
                                            <MDBIcon fas icon='trash' />
                                        </MDBBtn>
                                    </Tooltip>
                                    <Modal
                                        title="Xác nhận xoá người dùng"
                                        visible={deleteConfirmationUserId === user._id}
                                        onOk={() => {
                                            handleDeleteUser(user._id);
                                            setDeleteConfirmationUserId(null);
                                        }}
                                        onCancel={() => setDeleteConfirmationUserId(null)}
                                    >
                                        <p>Bạn có chắc chắn muốn xoá người dùng <strong>{user.fullName}</strong> này?</p>
                                    </Modal>

                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    );
};

export default User;