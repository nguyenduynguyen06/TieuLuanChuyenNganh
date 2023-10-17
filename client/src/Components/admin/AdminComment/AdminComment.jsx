import React from "react";
import { WrapperHeader} from "../AdminUser/style";
import TableComment from "../../TableComponents/TableComment";
import { Alert } from "antd";



const AdminComment = () => {
 

  return (
    <div>
        <Alert
        message="Bình luận có tên người bình luận phía sau có (QTV) là Admin, nếu khách hàng hỏi tiếp thì vào phần sản phẩm và tìm bình luận đó để trả lời"
        type="info"
        showIcon
        style={{ marginBottom: '16px', background: '#FFFF99' }}
      />
      <WrapperHeader>Danh sách bình luận chờ duyệt</WrapperHeader>
      <div style={{ marginTop: '15px' }}>
        <TableComment  />
      </div>
    </div>
  );
};

export default AdminComment;