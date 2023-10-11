import React  from "react";
import NavBarComponent from "../../Components/NavBarComponent/navbarcomponent";
import CardComponent from "../../Components/CardComponent/CardComponent";
import { Col, Row } from 'antd'
import ListBrand from "../../Components/ListBrandComponent/ListBrandComponent";
import Header from "../../Components/Header/header";

const TypeProductBrandandCategory = () => {

    return (
        <div>
            <Header />
            <div style={{ background: '#fff', flexWrap: 'nowrap', paddingTop: '10px' }}>
                <Row >
                    <ListBrand/>
                </Row>
                <Row style={{ background: '#fff', marginRight: '10px', padding: '10px', borderRadius: '6px' }}>
                    <Col span={4} style={{paddingLeft: '20px'}}>
                        <NavBarComponent />
                    </Col>
                    <Col span={20}>
                        <CardComponent />
                    </Col>
                </Row>
                <br></br>
            </div>
        </div>
    )
}

export default TypeProductBrandandCategory;