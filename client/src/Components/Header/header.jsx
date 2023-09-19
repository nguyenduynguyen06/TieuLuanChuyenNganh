import React from "react";
import { Col} from 'antd'
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderImage, WrapperHeaderProduct} from "./style";
import Search from "antd/es/input/Search";
import {
    UserOutlined,
    ShoppingCartOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import TypeProducts from "./typeproducts";
const arr = ['Xiaomi','Iphone','Samsung']
const Header = () => {
    return (
        <div> 
    <WrapperHeader>
    <Col span={4}></Col>
    <Col span={4} className="ant-col">
        
         <WrapperHeaderImage className="ant-image">
            <img src="/image/didongg.png" alt="blink" />
        </WrapperHeaderImage>
    </Col>
        <Col span={8}>
        <Search
            placeholder="Tìm Kiếm"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            //onSearch={handleSearch}
         />
         <div >
            <WrapperHeaderProduct>
                {arr.map((item) => {
                    return(
                        <TypeProducts name = {item} key={item} />
                    )
                }
                )}
            </WrapperHeaderProduct>
         </div>
        </Col>
    <Col span={2}></Col>
        <Col span={7} >
            <WrapperHeaderAccount>
            <UserOutlined style={{fontSize: '30px'}}/>
            <div>
                <span style={{fontSize: '15px'}}>
                    Đăng nhập
                </span>
            </div>
            <div>
                <span style={{fontSize: '15px'}} >
                    /
                </span>
            </div>
            <div>
                <span style={{fontSize: '15px'}} >
                    Đăng ký
                </span>
            </div>
            <div><button class="custom-button" style={{backgroundColor: '#CC0000'}}>
            <ShoppingCartOutlined style={{fontSize: '20px'}} > 
            </ShoppingCartOutlined>&nbsp;Giỏ hàng
            </button>
            </div>
            </WrapperHeaderAccount>
            </Col>
            
    </WrapperHeader>
      </div>
    )
}
export default Header