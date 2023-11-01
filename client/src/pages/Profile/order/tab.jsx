import { Button } from 'antd';
import React, { useState } from 'react';
import { WrapperBtn, WrapperTab } from './style';
import OrderList from './orderlist';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('Chờ xác nhận');

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <WrapperTab>
      <div className="tab-buttons">
        <WrapperBtn size='large'
          className={activeTab === 'Chờ xác nhận' ? 'active' : ''}
          onClick={() => changeTab('Chờ xác nhận')}
        >
          <i class="fas fa-check-to-slot"></i>&nbsp;Chờ xác nhận
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 'Đơn hàng đang được chuẩn bị' ? 'active' : ''}
          onClick={() => changeTab('Đơn hàng đang được chuẩn bị')}
        >
          <i class="fas fa-box"></i>&nbsp;Chờ chuẩn bị hàng
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 'Đơn hàng đang được giao' ? 'active' : ''}
          onClick={() => changeTab('Đơn hàng đang được giao')}
        >
          <i class="fas fa-truck"></i>&nbsp;Chờ giao hàng
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 'Đơn hàng sẵn sàng' ? 'active' : ''}
          onClick={() => changeTab('Đơn hàng sẵn sàng')}
        >
          <i class="fas fa-box-open"></i>&nbsp;Nhận tại cửa hàng
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 'Đã hoàn thành' ? 'active' : ''}
          onClick={() => changeTab('Đã hoàn thành')}
        >
          <i class="far fa-square-check"></i>&nbsp;Đã hoàn thành
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 'Đã hủy' ? 'active' : ''}
          onClick={() => changeTab('Đã hủy')}
        >
          <i class="far fa-square-check"></i>&nbsp;Đã huỷ
        </WrapperBtn>
      </div>
      <div className="tab-content">
      <OrderList status={activeTab} />
      </div>
    </WrapperTab>
  );
};

export default Tab;
