import React from 'react'

const adminHomePage = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role_id = localStorage.getItem('role_id');
  if (isLoggedIn && role_id === '1') {
    return (
      <div>
        <h1>Chào mừng đến trang Admin</h1>
      </div>
    );
  } else {
    window.location.href = '/';
    return null;
  }
}
export default adminHomePage