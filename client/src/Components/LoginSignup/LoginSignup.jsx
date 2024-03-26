import React, { useState } from "react";
import { WrapperLogin } from "./style";

const LoginSignup = () => {
    const [action, setAction] = useState("Đăng ký");

    return (
        <WrapperLogin>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Đăng nhập" ? <div></div> :
                        <div className="input">
                            <input type="text" placeholder="Họ và Tên"></input>
                        </div>}
                    {action === "Đăng nhập" ? <div></div> :

                        <div className="input">
                            <input type="text" placeholder="Số điện thoại"></input>
                        </div>}
                    {action === "Đăng nhập" ? <div></div> :
                        <div className="input">
                            <input type="text" placeholder="Địa chỉ"></input>
                        </div>}
                    <div className="input">
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Mật khẩu"></input>
                    </div>
                    {action === "Đăng nhập" ? <div></div> :
                        <div className="input">
                            <input type="password" placeholder="Nhập lại mật khẩu"></input>
                        </div>}
                </div>
                {action === "Đăng ký" ? <div></div> :
                    <div className="forgot-password">Quên mật khẩu?<span> Nhấn vào đây!</span></div>}
                <div className="submit-container">
                    <div className={action === "Đăng nhập" ? "submit gray" : "submit"} onClick={() => { setAction("Đăng ký") }}>Đăng ký</div>
                    <div className={action === "Đăng ký" ? "submit gray" : "submit"} onClick={() => { setAction("Đăng nhập") }}>Đăng nhập</div>
                </div>
            </div>
        </WrapperLogin>
    )
}

export default LoginSignup