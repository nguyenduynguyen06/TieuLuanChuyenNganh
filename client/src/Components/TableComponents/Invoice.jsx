import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

const Invoice = ({ order,  }) => {
 

  return (
    <div id="invoice-content">
      <h2>Hoá đơn đặt hàng</h2>
      <p>Mã Đơn Hàng: {order.orderCode}</p>
      <p>Tên Người Đặt: {order.userName}</p>
      <table>
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Bộ nhớ</th>
            <th>Màu</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.product._id}>
              <td>
                <img
                  src={item.pictures}
                  alt="Hình ảnh"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{item.product.name}</td>
              <td>{item.memory}</td>
              <td>{item.color}</td>
              <td>{item.quantity}</td>
              <td>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </td>
              <td>
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
  );
};

export default Invoice;
