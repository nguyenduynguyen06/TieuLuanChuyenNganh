import React, { useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { AppstoreOutlined, CameraOutlined, LockOutlined } from '@ant-design/icons';
import { Breadcrumb, message, Upload, Menu, Modal } from 'antd';
import UpdateUser from './updateUser';
import ChangePassword from './changepass'
import { useSelector, useDispatch } from "react-redux";
import Header from '../../Components/Header/header';
import Orders from './order/orders';
import axios from "axios";
import { resetUser } from "../../redux/Slide/userSlice";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const Profilepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  function checkFile(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên tệp tin JPG/PNG!');
    }
    return isJpgOrPng;
  }
  const props = {
    name: 'image',
    action: `${process.env.REACT_APP_API_URL}/uploadUser/${user._id}`,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        window.location.reload();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: checkFile,
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/Logout`, {}, { withCredentials: true });
      dispatch(resetUser)
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng xuất:', error);
    }
  };

  const items = [
    getItem('Thông tin cá nhân', '/profile/infor', <AppstoreOutlined />),
    getItem('Đổi mật khẩu', '/profile/changepass', <LockOutlined />),
    getItem('Đơn hàng của bạn', '/profile/orders', <AppstoreOutlined />),
  ];

  if (user.role_id === 1) {
    items.push(getItem('Quản lý', '/admin', <LockOutlined />));
  }

  items.push(getItem('Đăng xuất', 'logout', <AppstoreOutlined />));

  const onClick = ({ key }) => {
    if (key === 'logout') {
      setLogoutModalVisible(true);
    } else {
      navigate(key);
    }
  };
  useEffect(() => {
    document.title = "Di Động Gen Z | Người Dùng";
}, []);


  return (
    <section style={{ backgroundColor: '#fff' }}>
      <Header></Header>
      <div style={{ height: '100px', background: 'linear-gradient(to bottom, #B63245, #fff', display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <img src={user.avatar} alt="avatar" className="rounded-circle"
            style={{ height: '100%', width: 'auto', margin: '20px 20px 0px 20px' }} />
          <span style={{ color: '#fff' }}>{user.fullname}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '50%', paddingRight: '30px' }}>
          <Upload {...props}>
            <MDBBtn style={{ backgroundColor: '#fff', color: "black" }}  > <CameraOutlined /> Ảnh đại diện</MDBBtn>
          </Upload>
        </div>
      </div>

      <Breadcrumb style={{ margin: '30px 20px 10px' }}>
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to={`/profile`}>Profile</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: 'flex' }}>
        <Menu
          style={{ width: '15%', minWidth: '15%', background: "#fff" }}
          onClick={onClick}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
        <div className='content-component' style={{minHeight:'100vh', maxHeight: '100vh', width: '100%', overflow:'auto' }}>
          {location.pathname === '/profile' && <UpdateUser/>}
          {location.pathname === '/profile/infor' && <UpdateUser />}
          {location.pathname === '/profile/changepass' && <ChangePassword />}
          {location.pathname === '/profile/orders' && <Orders />}
        </div>

        <Modal
          title="Xác nhận đăng xuất"
          visible={logoutModalVisible}
          onCancel={handleLogoutCancel}
          onOk={handleLogout}
          okText="Đăng xuất"
          cancelText="Hủy"
          okButtonProps={{ style: { backgroundColor: '#C13346', borderColor: '#C13346', color: '#fff' } }} 

        >
          <p>Bạn có chắc chắn muốn đăng xuất?</p>
        </Modal>

      </div>
    </section>
  )
}

export default Profilepage