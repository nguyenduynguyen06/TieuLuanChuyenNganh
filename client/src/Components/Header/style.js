import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.div`
padding: 7px 120px;
display: flex;
flex-wrap: wrap;
align-item:center;
justify-content: space-evenly;
background-size: cover;
background-color: #ff3300;
// background-image: url('./image/giangsinhvuive.png');
background-position: center;
width: 100%;
// grid-template-columns: repeat(auto-fill, minmax(200px, 300px));



`;
// export const Search = styled(Search)`
//   .ant-input-search-button {
//     background: #FF3300;
//     display: grid;
//     place-items: center;
//   }
// `;


export const WrapperHeaderImage = styled.div`
  display: n;
  place-items: center;
  a {
    display: block;
    width: 100%;
  }
  img {
    max-width: 100%;
  }
`;

export const WrapperHeaderAccount = styled.div`
    // margin: 0 50px;
    display : flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    white-space: nowrap;
    position: end;
    button.custom-button {
        background-color: #007bff; 
        color: #fff; 
        padding: 10px 20px; /* Kích thước nút */
        border: none; /* Loại bỏ đường viền */
        border-radius: 5px; /* Bo góc nút */
        cursor: pointer; /* Biến con trỏ thành bàn tay khi hover */
        font-size: 16px; /* Kích thước chữ */
        position: static;
        display : flex;
        
    
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
    // display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
`;
export const CustomButton = styled.button`
  background-color: #CC0000;
  display: grid;
  place-items: center;
`;

