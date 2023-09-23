import React from "react";
import { WrapperHomePage, WrapperNa } from "./styled";
import { Col} from 'antd'
import Category from '../category/category'
import Slide from "../../Components/Slider/Slide";
import Slider1 from "../../image/slide1.png"
import Slider2 from "../../image/slide2.png"
import Slider3 from "../../image/slide3.png"
const HomePage = () => {
    return(
        <div>
            <WrapperHomePage>
                <Col span={4}></Col>
                 <Col span={15}>
                    <div id = "container" style={{backgroundColor: '#FF3300', padding: '0 120px'}}>
                    <Slide arrImage = {[Slider1, Slider2, Slider3]} />
                    </div>
                    <br />
                    <br />
                    <Category></Category>
             
                  
                 </Col> 
            </WrapperHomePage>
        </div>
        
    );
}
export default HomePage