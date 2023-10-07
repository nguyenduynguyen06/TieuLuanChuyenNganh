import React from "react";
import NavBarComponent from "../../Components/NavBarComponent/navbarcomponent";
import CardComponent from "../../Components/CardComponent/CardComponent";
import { Col, Pagination, Row } from 'antd'
import ListBrand from "../../Components/ListBrandComponent/ListBrandComponent";

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{padding: '0 120px', background: '#fff', flexWrap: 'nowrap', paddingTop: '10px' }}>
            <Row>
                <ListBrand/>
            </Row>
            <Row style={{ background: '#fff', marginRight: '10px', padding: '10px', borderRadius: '6px'}}>
                <Col span={4} style={{  }}>
                    <NavBarComponent />
                </Col>
                <Col span={20}>
                    <CardComponent />
                </Col>
            </Row>
            <Pagination showQuickJumper defaultCurrent={1} total={50} onChange={onChange} style={{ textAlign: 'center', marginTop: '20px'}}/>

            <br></br>
        </div>
    )
}

export default TypeProductPage;