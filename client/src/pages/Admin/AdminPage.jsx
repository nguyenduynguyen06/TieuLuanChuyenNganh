import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem} from './utils';
import Header from '../../Components/Header/header';
import AdminProduct from '../../Components/admin/AdminProduct/AdminProduct';
import AdminUser from '../../Components/admin/AdminUser/AdminUser';
import { useSelector } from 'react-redux';

const AdminHomePage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role_id = localStorage.getItem('role_id');
  // useEffect(() => {
  //   if (isLoggedIn && role_id === '1') {
  //   } else {
  //     window.location.href = '/';
  //   }
  // }, [isLoggedIn, role_id]);
  
  
  // const [openKeys, setOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
    switch(key) {
      case 'users':
        return(
          <AdminUser/>
        )
      case 'products':
          return (
            <AdminProduct/>
          )
      default:
        return <></>
    }
  }

  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   const rootSubmenuKeys = ['user', 'product']; // Định nghĩa biến rootSubmenuKeys ở đây
  //   if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };
  
  const items = [
    getItem('Dashboard', 'dashboard', <UserOutlined />),
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),];

  const user = useSelector((state)=> state.user)
  if (user && user.role_id == 1) {
    const handleOnClick = ({key}) => {
      setKeySelected(key)}
    console.log('keySelected', keySelected)
    return (
      <>
        <Header isHiddenSearch isHiddenCart/>
        <div style={{display: 'flex'}}>          
        <Menu
          mode="inline"
          // openKeys={openKeys}
          // onOpenChange={onOpenChange}
          style={{
            width: 256,
            boxShadow: '1px 2px 1px #ccc',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{flex: 1, padding: '15px'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>);
  } else {
    return (
      <div>
        <h1>Bạn không có quyền truy cập trang Admin</h1>
      </div>
    );
  }
}

export default AdminHomePage;
