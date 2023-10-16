import React from "react";
import { WrapperHeader} from "../AdminUser/style";
import TableComment from "../../TableComponents/TableComment";



const AdminComment = () => {
 

  return (
    <div>
      <WrapperHeader>Danh sách bình luận chờ duyệt</WrapperHeader>
      <div style={{ marginTop: '15px' }}>
        <TableComment  />
      </div>
    </div>
  );
};

export default AdminComment;