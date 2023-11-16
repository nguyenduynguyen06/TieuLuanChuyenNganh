import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";
import { WrapperInvoice } from "./style";

const Invoice = ({ order, }) => {
  const tableCellStyle = {
    border: '1px solid #ddd', // You can adjust the color and thickness of the border
    padding: '8px', // Adjust the padding as needed
    textAlign: 'left', // Adjust text alignment as needed
  };
  

  return (
    <WrapperInvoice>
      <div id="invoice-content">
        <div className="header-in">
          <div className="logo">
            <img className="logo-img" src="../../image/logo.png"></img>
          </div>
          <div className="inf">
            <span>DI ĐỘNG GEN Z</span>
            <span>Địa chỉ: Số 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức</span>
            <span>Điện thoại: 0853204897</span>
            <span>Email: didonggenz@gmail.com</span>
          </div>
        </div>
        <p style={{ textAlign: 'center' }}>HÓA ĐƠN BÁN HÀNG</p>
        <div className="body-inf">
          <span>Mã Đơn Hàng: {order.orderCode}</span>
          <span>Khách Hàng: {order.userName}</span>
          <span>Ngày In Hóa Đơn: 01/09/2002</span>
        </div>
        <div>
          <table style={{ fontSize: '15px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableCellStyle}>Tên sản phẩm</th>
                <th style={tableCellStyle}>Bộ nhớ</th>
                <th style={tableCellStyle}>Màu</th>
                <th style={tableCellStyle}>Số lượng</th>
                <th style={tableCellStyle}>Đơn giá</th>
                <th style={tableCellStyle}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.product._id}>
                  <td style={tableCellStyle}>{item.product.name}</td>
                  <td style={tableCellStyle}>{item.memory}</td>
                  <td style={tableCellStyle}>{item.color}</td>
                  <td style={tableCellStyle}>{item.quantity}</td>
                  <td style={tableCellStyle}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </td>
                  <td style={tableCellStyle}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display: 'flex', justifyContent:'space-around', marginTop: '10px'}}>
          <div className="sign" style={{display: 'flex', flexDirection:'column'}}>
            <span>Khách hàng</span>
            <span> &#40;Ký, ghi rõ họ tên &#41;</span>
          </div>
          <div className="sign" style={{display: 'flex', flexDirection:'column'}}>
            <span>Đại diện cửa hàng</span>
            <span> &#40;Ký, ghi rõ họ tên &#41;</span>
          </div>
        </div>
      </div>
    </WrapperInvoice>
  );
};

export default Invoice;
