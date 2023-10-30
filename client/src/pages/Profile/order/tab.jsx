import { Button } from 'antd';
import React, { useState } from 'react';
import { WrapperBtn, WrapperTab } from './style';
import OrderList from './orderlist';

const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <WrapperTab>
      <div className="tab-buttons">
        <WrapperBtn size='large'
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => changeTab(2)}
        >
          <i class="fas fa-check-to-slot"></i>&nbsp;Chờ xác nhận
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 3 ? 'active' : ''}
          onClick={() => changeTab(3)}
        >
          <i class="fas fa-box"></i>&nbsp;Chờ lấy hàng
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 4 ? 'active' : ''}
          onClick={() => changeTab(4)}
        >
          <i class="fas fa-truck"></i>&nbsp;Chờ giao hàng
        </WrapperBtn>
        <WrapperBtn size='large'
          className={activeTab === 5 ? 'active' : ''}
          onClick={() => changeTab(5)}
        >
          <i class="far fa-star-half-stroke"></i>&nbsp;Đánh giá
        </WrapperBtn>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <div><OrderList/></div>}
        {activeTab === 2 && <div><OrderList/></div>}
        {activeTab === 3 && <div><OrderList/></div>}
        {activeTab === 4 && <div><OrderList/></div>}
        {activeTab === 5 && <div><OrderList/></div>}

      </div>
    </WrapperTab>
  );
};

export default Tab;
