import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Space, Modal } from 'antd';

import { NavLink, useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import ErrorMessage from "../../error";


function NewAdmin({ closeModal }) {
    const user1 = useSelector((state) => state.user);
    const headers = {
        token: `Bearers ${user1.access_token}`,
    };
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [user, setUser] = useState({
        fullName: '',
        address: '',
        phone_number: '',
        email: '',
        passWord: '',
        confirmPassword: '',
    });
    const onChange = event => {
        const { name, value } = event.target;

        if (name === "phone_number") {
            // Chỉ cho phép nhập số và giới hạn độ dài tối đa là 10 ký tự
            const phoneNumber = value.replace(/\D/g, '').slice(0, 10);
            setUser({ ...user, [name]: phoneNumber });
        } else {
            setUser({ ...user, [name]: value });
        }

        if (name === 'passWord' || name === 'confirmPassword') {
            setPasswordsMatch(user.passWord === user.confirmPassword);
        }
    };

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/province/getProvince`)
            .then(response => {
                setProvinces(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);
    const onChangeProvince = (value) => {
        setUser({ ...user, province: value });
        setDistricts([]);
        setCommunes([]);
        axios.get(`${process.env.REACT_APP_API_URL}/province/getDistrict/${value}`)
            .then(response => {
                setDistricts(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    };

    const onChangeDistrict = (value) => {
        setUser({ ...user, district: value });
        axios.get(`${process.env.REACT_APP_API_URL}/province/getCommnune/${value}`)
            .then(response => {
                setCommunes(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching communes:', error);
            });
    };

    const onChangeCommune = (value) => {
        setUser({ ...user, commune: value });
    };
    const signupHandler = event => {
        event.preventDefault();
        if (!user.fullName || !user.address || !user.phone_number || !user.email || !user.passWord || !user.confirmPassword || !user.province || !user.district || !user.commune) {
            setSuccess(false);
            setMessage("Vui lòng điền vào tất cả các trường bắt buộc");
            return;
        }
        if (!/^\d{10}$/.test(user.phone_number)) {
            setSuccess(false);
            setMessage("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại gồm 10 chữ số.");
            return;
        }

        if (!passwordsMatch) {
            setSuccess(false);
            setMessage("Xác nhận password sai");
            return;
        }
        const specificAddress = `${user.address}, ${communes && communes.find(commune => commune.idCommune === user.commune)?.name || ''}, ${districts && districts.find(district => district.idDistrict === user.district)?.name || ''}, ${provinces && provinces.find(province => province.idProvince === user.province)?.name || ''}`;

        axios.post(`${process.env.REACT_APP_API_URL}/user/createAdmin`, { ...user, addRess: specificAddress }, {
            headers,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data.success) {
                    closeModal();
                    setSuccess(true);
                    setMessage(`${res.data.msg}`);
                    setUser({
                        fullName: '',
                        address: '',
                        phone_number: '',
                        email: '',
                        passWord: '',
                        confirmPassword: '',
                        commune: '',
                        district: '',
                        province: ''
                    });
                    setDistricts([]);
                    setCommunes([]);
                } else {
                    setSuccess(false);
                    setMessage(`${res.data.msg}`);
                }
            }).catch((err) => {
                setSuccess(false);
                setMessage(`Email đã được sử dụng`);
            })
    }
    const handleCloseModal = () => {
        closeModal();
        setUser({
            fullName: '',
            address: '',
            phone_number: '',
            email: '',
            passWord: '',
            confirmPassword: '',
            commune: '',
            district: '',
            province: ''
        });
        setDistricts([]);
        setCommunes([]);
    };
    const handleClose = () => {
        setMessage('');
      };
    
    return (
        <MDBContainer fluid >
            <MDBRow>
            <ErrorMessage message={message} success={success} onClose={handleClose} />
                <MDBCol sm='14' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className='d-flex flex-row' style={{ paddingTop: '20px' }}>
                        <img className="logo" src="../../image/didong3.png" alt="" style={{ maxWidth: '100%' }} />
                    </div>
                    <h3 className="fw-normal" style={{ letterSpacing: '1px', color: '#B63245' }}>Tạo admin mới</h3>
                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                        <form onSubmit={signupHandler}>
                            <MDBInput wrapperClass='mb-4' label='Họ và tên' name="fullName" value={user.fullName} onChange={onChange} type='text' tabIndex="1" />
                            <div style={{ display: 'flex', gap: '5%' }}>
                                {provinces.length > 0 && (
                                    <Select
                                        showSearch
                                        style={{ width: '30%', marginBottom: '25px' }}
                                        placeholder="Tỉnh"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        value={user.province}
                                        options={provinces.map(province => ({ value: province.idProvince, label: province.name }))}
                                        onChange={onChangeProvince}
                                    />
                                )}
                                {districts.length > 0 && (
                                    <Select
                                        showSearch
                                        style={{ width: '30%', marginBottom: '25px' }}
                                        placeholder="Huyện"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={districts.map(district => ({ value: district.idDistrict, label: district.name }))}
                                        onChange={onChangeDistrict}
                                    />
                                )}
                                {communes.length > 0 && (
                                    <Select
                                        showSearch
                                        style={{ width: '30%', marginBottom: '25px' }}
                                        placeholder="Xã"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={communes.map(commune => ({ value: commune.idCommune, label: commune.name }))}
                                        onChange={onChangeCommune}
                                    />
                                )}
                            </div>
                            <MDBInput wrapperClass='mb-4' label='Tên đường,số nhà' name="address" value={user.address} onChange={onChange} type='text' tabIndex="2" />
                            <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user.phone_number} onChange={onChange} type='text' tabIndex="3" />
                            <MDBInput wrapperClass='mb-4' label='Email' name="email" value={user.email} onChange={onChange} type='email' tabIndex="4" />
                            <MDBInput wrapperClass='mb-4' label='Password' name="passWord" value={user.passWord} onChange={onChange} type='password' tabIndex="5" onBlur={() => { setPasswordsMatch(user.passWord === user.confirmPassword); }} />
                            <MDBInput wrapperClass='mb-4' label='Nhập lại password' name="confirmPassword" value={user.confirmPassword} onChange={onChange} type='password' tabIndex="6" onBlur={() => { setPasswordsMatch(user.passWord === user.confirmPassword); }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <MDBBtn className='w-48 mb-4' size='md' style={{ background: '#B63245', marginRight: '10px' }} type="submit">Đăng ký</MDBBtn>
                                <MDBBtn className='w-48 mb-4' size='md' style={{ background: '#B63245' }} type="button" onClick={handleCloseModal}>Hủy bỏ</MDBBtn>
                            </div>
                        </form>

                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default NewAdmin;