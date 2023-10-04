import React from "react";
import NavBarComponent from "../../Components/NavBarComponent/navbarcomponent";
import CardComponent from "../../Components/CardComponent/CardComponent";
import {Col, Row} from 'antd'

const TypeProductPage =() =>{
    return (
        <Row style={{padding: '0 120px', background: '#efefef', flexWrap: 'nowrap'}}>
            <Col span={4} style={{background: '#fff'}}>
                <NavBarComponent/>
            </Col>
            <Col span={20}>
                <CardComponent/>
            </Col>
        </Row>
    )
}

export default TypeProductPage;