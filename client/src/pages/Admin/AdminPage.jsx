import React, { useEffect, useState } from 'react';
import { AppstoreFilled, UserOutlined, ProfileFilled, QqOutlined, PrinterFilled, StarFilled, MessageFilled, SignalFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getItem } from './utils';
import Header from '../../Components/Header/header';
import { useSelector } from 'react-redux';

import NewCategory from '../../Components/admin/AdminCategory/NewCategory';
import NotFoundPage from '../notfoundpage';
import NewBrand from '../../Components/admin/AdminBrand/NewBrand';
import AdminComment from '../../Components/admin/AdminComment/AdminComment';


import NewVoucher from '../../Components/admin/AdminVoucher/NewVoucher';

import Dashboard from '../../Components/admin/AdminDashboard/admindashboard';

import Product from '../../Components/admin/AdminProduct/Product';
import OrderPending from '../../Components/admin/AdminOrder/OrderPending';
import OrderReady from '../../Components/admin/AdminOrder/OrderReady';
import OrderComplete from '../../Components/admin/AdminOrder/OrderComplete';
import OrderDelivery from '../../Components/admin/AdminOrder/OrderDelivery';
import OrderReadyCancel from '../../Components/admin/AdminOrder/OrderReadyCancel';
import OrderCanCel from '../../Components/admin/AdminOrder/OrderCancel';
import Category from '../../Components/admin/AdminCategory/Category';
import Brand from '../../Components/admin/AdminBrand/Brand';
import Sider from 'antd/es/layout/Sider';
import User from '../../Components/admin/AdminUser/User';
import Voucher from '../../Components/admin/AdminVoucher/Voucher';
import OrderDelivered from '../../Components/admin/AdminOrder/OrderDelivered';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    document.title = "Di Động Gen Z | Quản Lý";

    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])
  const goBack = () => {
    window.history.back();
  };

  const items = [
    getItem('Dashboard', '/admin/dashboard', <SignalFilled />),
    getItem('Người dùng', '/admin/users', <UserOutlined />),
    getItem('Sản phẩm', '/admin/products', <AppstoreFilled />),
    getItem('Danh mục', '/admin/categories', <ProfileFilled />),
    getItem('Thương hiệu', '/admin/brands', <QqOutlined />),
    getItem('Bình luận', '/admin/comments', <MessageFilled />),
    getItem('Đơn hàng', '/admin/order', <PrinterFilled />, [
      getItem('Chờ xác nhận', '/admin/order/pending'),
      getItem('Đang chuẩn bị đơn hàng', '/admin/order/ready'),
      getItem('Đang giao hàng', '/admin/order/delivery'),
      getItem('Đã giao hàng', '/admin/order/delivered'),
      getItem('Đã hoàn thành', '/admin/order/complete'),
      getItem('Đang chờ huỷ', '/admin/order/readycancel'),
      getItem('Đã huỷ', '/admin/order/cancel'),
    ]),
    getItem('Voucher', '/admin/voucher', <StarFilled />)
  ];

  const user = useSelector((state) => state.user)
  if (user && user.role_id == 1) {
    const onClick = ({ key }) => {
      navigate(key);
    };
    return (
      <>
        <Header isHiddenSearch isHiddenCart />
        <div style={{ display: 'flex' }}>
          <Sider width={'15%'}>
            <Menu
              style={{ width: '100%', height: '100vh', boxShadow: '1px 2px 1px #ccc' }}
              onClick={onClick}
              mode="inline"
              selectedKeys={[location.pathname]}
              items={items}
            />
          </Sider>
          <div className='content-component' style={{ minHeight: '100vh', maxHeight: '100vh', width: '100%', overflow: 'auto', padding:'30px 30px 0 30px', scrollbarWidth:'none' }}>
            {location.pathname === '/admin' && <Dashboard />}
            {location.pathname === '/admin/dashboard' && <Dashboard />}
            {location.pathname === '/admin/users' && <User />}
            {location.pathname === '/admin/products' && <Product />}
            {location.pathname === '/admin/categories' && <Category />}
            {location.pathname === '/admin/brands' && <Brand />}
            {location.pathname === '/admin/comments' && <AdminComment />}
            {location.pathname === '/admin/order/pending' && <OrderPending />}
            {location.pathname === '/admin/order/ready' && <OrderReady />}
            {location.pathname === '/admin/order/delivery' && <OrderDelivery />}
            {location.pathname === '/admin/order/delivered' && <OrderDelivered />}
            {location.pathname === '/admin/order/complete' && <OrderComplete />}
            {location.pathname === '/admin/order/readycancel' && <OrderReadyCancel />}
            {location.pathname === '/admin/order/cancel' && <OrderCanCel />}
            {location.pathname === '/admin/voucher' && <Voucher />}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <NotFoundPage />
      </div>
    );
  }
}

export default AdminHomePage;
