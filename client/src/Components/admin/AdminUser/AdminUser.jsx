import React from "react";
import { Button } from "antd";
import { WrapperHeader } from "../AdminUser/style";
import {PlusOutlined} from '@ant-design/icons'

const AdminUser = () =>{
    return(
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{marginTop: '10px'}}>            
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}>
                    <PlusOutlined style={{fontSize: '60px'}}/>
                </Button>
            </div>
            <div style={{marginTop: '15px'}}>
      
            </div>
        </div>
    )
}

export default AdminUser