import React from 'react';
import { useSelector } from 'react-redux';

const AdminHomePage = () => {
  const user = useSelector((state)=> state.user)
  if (user && user.role_id == 1) {
    return (
      <div>
        <h1>Chào mừng đến trang Admin</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bạn không có quyền truy cập trang Admin</h1>
      </div>
    );
  }
};

export default AdminHomePage;
