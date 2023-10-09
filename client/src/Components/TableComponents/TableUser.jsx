import React, { useState, useEffect } from "react";
import { Alert, InputNumber, Modal, Table } from 'antd';
import { Space } from 'antd';
import { Switch } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import Search from "antd/es/input/Search";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { message, Upload, Collapse } from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker
} from 'antd';


const TableUser = () => {
    const props = (fieldKey) => ({
        name: 'image',
        action: `${process.env.REACT_APP_API_URL}/upload`,
        headers: {
            authorization: 'authorization-text',
        },
        accept: '.jpg, .jpeg, .png',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
            }
            return isJpgOrPng;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const uploadedFilePath = info.file.response.imageUrl;
                if (typeof uploadedFilePath === 'string') {
                    const updatedAttributes = form.getFieldValue('attributes');
                    updatedAttributes[fieldKey].pictures = uploadedFilePath;
                    form.setFieldsValue({ attributes: updatedAttributes });
                } else {
                    console.error('uploadedFilePath is not a string:', uploadedFilePath);
                }
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    });


    const [form] = Form.useForm();
    const [users, setUsers] = useState([])
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);
    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'addRess',
        },
        {
            title: "Hình ảnh hiển thị",
            dataIndex: "thumnails",
            render: theImageURL => <img alt={theImageURL} src={theImageURL} style={{ maxWidth: "100px", maxHeight: "100px" }} />
        },
        {
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => setDeleteModalVisible(true)}> <DeleteOutlined /></a>
                    <Modal
                        title="Xác nhận xoá khách hàng"
                        visible={isDeleteModalVisible}
                        onOk={() => {
                            handleDeleteUser(record._id);
                            setDeleteModalVisible(false);
                        }}
                        onCancel={() => setDeleteModalVisible(false)}
                    >
                        <p>Bạn có chắc chắn muốn xoá khách hàng này?</p>
                    </Modal>
                </Space>
            ),
        },
        {
            title: 'Khóa/Mở Khóa',
            dataIndex: 'isHide',
            render: (isHide, record) => (
                <Switch
                    checked={!isHide}
                    onChange={(checked) => {
                        handleToggleHide(record._id, !checked);
                    }}
                />
            ),
        }

    ];

    const { Option } = Select;
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };


    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/getAll`)
            .then((response) => {
                setUserData(response.data.data);
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API: ', error);
            });
    }, []);
    
    const handleSaveEdit = (id, values) => {
        const userId = id;
        axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, values)
            .then((response) => {
                axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`)
                    .then((response) => {
                        setUserData(response.data.data);
                    })
                form.resetFields();
                setUpdate(false);
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật tài khoản: ", error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/user/delete/${userId}`)
            .then((response) => {
                const updatedUser = userData.filter(user => user._id !== userId);
                setUserData(updatedUser);
            })
            .catch((error) => {
                console.error('Lỗi khi xóa tài khoản: ', error);
            });
    };
    const handleToggleHide = (userId, checked) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, {
            isHide: checked,
        })
            .then((response) => {
                const updatedUser = {
                    ...userData.find(user => user._id === userId),
                    isHide: checked,
                };
                const updatedUsers = userData.map(user =>
                    user._id === userId ? updatedUser : user
                );
                console.log('checked', checked)
                setUserData(updatedUsers);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật tài khoản: ', error);
            });
    };



    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            axios.get(`${process.env.REACT_APP_API_URL}/user/searchUser?keyword=${searchQuery}`)
                .then((response) => {
                    setSearchResults(response.data.data);
                })
                .catch((error) => {
                    console.error('Error searching users:', error);
                });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);
    return (
        <div>
            <div>
                <Search
                    style={{ width: '50%' }}
                    placeholder="Tìm kiếm tài khoản"
                    onSearch={handleSearch}
                    enterButton
                />
            </div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                </span>
            </div>
            <Table columns={columns} dataSource={searchQuery.trim() === '' ? userData.map((user, index) => ({
                ...user,
                key: index,
            })) : searchResults.map((user, index) => ({
                ...user,
                key: index,
            }))} />
        </div>
    );
};

export default TableUser;
