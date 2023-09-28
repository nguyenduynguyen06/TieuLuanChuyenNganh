import React from "react";
import { WrapperHomePage } from "./styled";
import { Col} from 'antd'
import Category from '../category/category'
import Slide from "../../Components/Slider/Slide"
import Imagebanner from "./imagebanner";
import ProductHomePage from "./ProducHomePage/producthomepage";

const HomePage = () => {
    return(
        <div className="container">
          <WrapperHomePage>
              <Col style={{ width: '12%' , paddingLeft: '10px' ,overflow: 'hidden'}}>
              {/* <Imagebanner style={{width:'100%', height:'100%'}}>
              </Imagebanner> */}
            </Col>
            <Col style={{ width: '75%', paddingLeft: '10px', paddingRight: '10px' }}>
              <div id="container">
                <Slide />
              </div>
              <br /> <br />
              <Category></Category>
              <br /><br />
              <ProductHomePage></ProductHomePage>
            </Col>
            <Col style={{ width: '12%' , overflow: 'hidden',paddingRight: '20px' }}>
              {/* <Imagebanner>
              </Imagebanner> */}
            </Col>
          </WrapperHomePage>
        </div>
        
    );
}
export default HomePage