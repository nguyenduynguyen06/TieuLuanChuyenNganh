import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem} from './utils';
import Header from '../../Components/Header/header';
import AdminProduct from '../../Components/admin/AdminProduct/AdminProduct';
import AdminUser from '../../Components/admin/AdminUser/AdminUser';
import { useSelector } from 'react-redux';

const AdminHomePage = () => {

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
