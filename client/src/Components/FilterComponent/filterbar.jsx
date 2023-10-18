import React from 'react';
import { DownOutlined , FallOutlined ,RiseOutlined} from '@ant-design/icons';
import { Button, Checkbox, Dropdown,Menu, Space } from 'antd';
import { WrapperFilterList } from './style';

const FilterBar = () => {
    const menu1 = (
        <Menu>
            <Menu.Item key="1">Dưới 2 triệu</Menu.Item>
            <Menu.Item key="2">Từ 2 đến 4 triệu</Menu.Item>
            <Menu.Item key="3">Từ 4 đến 7 triệu</Menu.Item>
            <Menu.Item key="4">Từ 7 đến 13 triệu</Menu.Item>
            <Menu.Item key="5">Từ 13 đến 20 triệu</Menu.Item>
            <Menu.Item key="6">Trên 20 triệu</Menu.Item>
        </Menu>
    );

    const menu2 = (
        <Menu>
            <Menu.Item key="7">32GB</Menu.Item>
            <Menu.Item key="8">64GB</Menu.Item>
            <Menu.Item key="9">128GB</Menu.Item>
            <Menu.Item key="10">256GB</Menu.Item>
            <Menu.Item key="11">512GB</Menu.Item>
            <Menu.Item key="12">1TB</Menu.Item>
        </Menu>
    );
    const menu3 = (
        <Menu>
            <Menu.Item key="13">5 sao</Menu.Item>
            <Menu.Item key="14">4 sao</Menu.Item>
            <Menu.Item key="15">3 sao</Menu.Item>
            <Menu.Item key="16">2 sao</Menu.Item>
            <Menu.Item key="17">1 sao</Menu.Item>

        </Menu>
    );
   return (
        <WrapperFilterList>
            <Button style={{ display: 'inline-flex', alignItems: 'center' }}>
            <FallOutlined style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Giá Cao - Thấp</Button>
            <Button style={{ display: 'inline-flex', alignItems: 'center' }}> 
            <RiseOutlined style={{ verticalAlign: 'middle', marginRight: '5px' }}/>Giá Thấp - Cao</Button>
            <Dropdown overlay={menu1} placement="bottomLeft">
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Giá <DownOutlined />
                </a>
            </Dropdown>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    Bộ nhớ <DownOutlined />
                </a>
            </Dropdown>
            <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={menu3} placement="bottomLeft">
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Số sao <DownOutlined />
          </a>
        </Dropdown>
        <Checkbox style={{ marginLeft: '10px' }}>Giảm giá</Checkbox>
      </div>


        </WrapperFilterList>
    )
}

export default FilterBar;
