import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
}
from 'mdb-react-ui-kit';
const PaymentInfo = () => {
    const [user, setUser] = useState({
        fullName: '',
        addRess: '',
        phone_number: '',
        email: '',
    });
    const onChange = event => {
        event.preventDefault();
      setUser({ ...user, [event.target.name]: event.target.value })
    }
    return (
        <div className="block-info">
            <div className="block-box">
                <div className="view-list">
                    <div className="view-list__wrapper">
                        <div className="item">
                            <img src="../../image/logo.png"></img>
                            <div className="item-info">
                                <p className="item-name"></p>
                                <div className="item-price">
                                    <div>
                                        <div className="box-info__box-price">
                                            <p className="product__price--show"></p>
                                            <p className="product__price--through"></p>
                                        </div>
                                    </div>
                                    <p>Số lượng: 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-customer">
                    <p>Thông tin khách hàng</p>
                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Họ và tên' name="fullName" value={user.fullName} onChange={onChange} type='text' tabIndex="1" />
                        </MDBCol>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user.addRess} onChange={onChange} type='text' tabIndex="2" />
                        </MDBCol>
                    </MDBRow>
                    <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user.phone_number} onChange={onChange} type='text' tabIndex="3" />
                    <MDBInput wrapperClass='mb-4' label='Email' name="email" value={user.email} onChange={onChange} type='email' tabIndex="4" />
                </div>
                <div className="block-payment"></div>
            </div>
        </div>
    )
}

export default PaymentInfo;