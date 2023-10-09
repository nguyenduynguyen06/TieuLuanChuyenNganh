import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
padding: 7px 120px;
display: flex;
flex-wrap: wrap;
align-item:center;
justify-content: space-evenly;
background-size: cover;
background-color: #ff3300;
background-image: linear-gradient(to right, #8c52ff,  #ff3300);
background-position: center;
width: 100%;
`;
// export const Search = styled(Search)`
//   .ant-input-search-button {
//     background: #FF3300;
//     display: grid;
//     place-items: center;
//   }
// `;


export const WrapperHeaderImage = styled(Col)`
  .logo {
    padding: 2px;
    margin: -2px;
    border-radius: 2px;
    display: block;
    width: auto;
    height: auto;
  }
  .logo img{
    width: 162px;
    height: 50px;
  }
  .ant-image {
    position: relative;
    top: -0.1875rem;
    padding-right: 2.5rem;
  }
`;

export const WrapperHeaderAccount = styled(Col)`
    // margin: 0 50px;
    display : flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    white-space: wrap;
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


export const WrapperForget = styled.div`
/* CSS cho container chung */
.forget-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

/* CSS cho form */
.forget-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.forget-form label {
  margin: 10px 0;
  font-weight: bold;
}

.forget-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.forget-form button {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

/* CSS cho thông báo */
.confirmation-message {
  margin: 20px 0;
  font-weight: bold;
}

/* CSS cho nút "Quay lại" */
.back-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
`
