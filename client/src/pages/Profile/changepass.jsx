import React, { useState } from "react";
import { Alert } from "antd";
import { Button, message, Upload } from 'antd';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';

    const ChangePassword = () => {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [user, setUser] = useState({
        passWord: '',
        newPass: '',
        confirmPassword: ''
    });
    const onChange = event => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
        if (user.newPass !== user.confirmPassword) {
          setPasswordsMatch(false);
          return;
        }
    }
    const changeHandler = event => {
        event.preventDefault();
        if (!passwordsMatch) {
            setSuccess(false);
            setMessage("Xác nhận password sai");
            return; 
        }

    }

    return (
        <form className="form-add-new" onSubmit={changeHandler} >
            <MDBContainer fluid>
                    <MDBCardBody className='p-5 text-center'>
                        {message && (
                            <h2>
                                {success ? (
                                    <i className="fas fa-check-circle" style={{ color: 'green' }}>&nbsp;</i>
                                ) : (
                                    <i className="fas fa-times-circle" style={{ color: 'red' }}>&nbsp;</i>
                                )}
                                {message}
                            </h2>
                        )}
                        
                        <h2 className="fw-bold mb-5">Đổi mật khẩu</h2>
                        <MDBInput wrapperClass='mb-4' label='Password cũ' name="passWord" value={user.passWord} onChange={onChange} type='password' tabIndex="1"/>
                        <MDBInput wrapperClass='mb-4' label='Password mới' name="newPass" value={user.newPass} onChange={onChange} type='password' tabIndex="2" onBlur={() => { setPasswordsMatch(user.newPass === user.confirmPassword); }} />
                        <MDBInput wrapperClass='mb-4' label='Nhập lại password' name="confirmPassword" value={user.confirmPassword} onChange={onChange} type='password' tabIndex="3" onBlur={() => { setPasswordsMatch(user.newPass === user.confirmPassword); }} />
                        <MDBBtn className='w-100 mb-4' size='md' style={{ background: '#FF3300' }}>Đồng ý</MDBBtn>
                    </MDBCardBody>
            </MDBContainer>
        </form>
    );

}

export default ChangePassword