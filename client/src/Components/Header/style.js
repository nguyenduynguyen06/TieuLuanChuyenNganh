import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
padding: 20px 120px;
background-size: cover;

background-image: url('./image/giangsinhvuive.png');
align-items: center;
flex-wrap : nowrap;
`


export const WrapperHeaderImage = styled.span`
`;
export const WrapperHeaderAccount = styled.div`
    display : flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    white-space: nowrap;
    button.custom-button {
        background-color: #007bff; /* Màu xanh đậm */
        color: #fff; /* Màu chữ trắng */
        padding: 10px 20px; /* Kích thước nút */
        border: none; /* Loại bỏ đường viền */
        border-radius: 5px; /* Bo góc nút */
        cursor: pointer; /* Biến con trỏ thành bàn tay khi hover */
        font-size: 16px; /* Kích thước chữ */
        
    }

   
    button.custom-button:hover {
        background-color: #0056b3; /* Màu xanh đậm khi hover */
    }
    .popup {
        position: relative;
        display: inline-block;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
`
export const WrapperHeaderProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    color: #fff;
    font-size: 12px; /* Đặt kích thước chữ là 14px */
    font-weight: bold; /* Đặt độ đậm cho chữ */
    height: 30px;
`

