import React from "react";
import { WrapperHomePage } from "./styled";
import { Col} from 'antd'
import Category from '../category/category'
import Slide from "../../Components/Slider/Slide"
import Imagebanner from "./imagebanner";
import ProductHomePage from "./ProducHomePage/producthomepage";

const HomePage = () => {
    return(
        <div>
            <WrapperHomePage>
            <Col style={{padding: '5px'}}>  </Col>
         <Col span={4} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}><Imagebanner></Imagebanner>
</Col>

                
                <Col style={{padding: '15px'}}>  </Col>
                 <Col span={15}>
                    <div id = "container">
                    <Slide />
                    </div>
                    <br />
                    <br />
                    <Category></Category>
                    <br />
                    <br />
                    <ProductHomePage></ProductHomePage>
                  
                 </Col>
                 <Col style={{padding: '15px'}}></Col>
               <Col span={4} style={{ whiteSpace: 'nowrap',overflow: 'hidden'}}> <Imagebanner/></Col>
            
            </WrapperHomePage>
        </div>
        
    );
}
export default HomePage