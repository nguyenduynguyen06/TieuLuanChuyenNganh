import Slider from "react-slick";
import { Col, Image, Row } from 'antd';
import React from 'react';
import Slider1 from "../../image/banner1.png";
import Slider2 from "../../image/banner2.png";
import Slider3 from "../../image/banner3.png";
import Slider4 from "../../image/banner4.png";
import { WrapperBanner } from "./style";

const arrImage = [Slider1, Slider2, Slider3, Slider4];

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        appendDots: (dots) => (
            <ul style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', listStyle: 'none', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {dots}
            </ul>
        )
    };
    
    return (
        <WrapperBanner style={{ display: 'flex', lineHeight: 0, height:'auto' }}>
            <Col  className="mainbanner">
                <Slider {...settings} className="slider">
                    {arrImage.map((image) => {
                        return (
                            <Image src={image} alt='slider' preview={false} width="auto" height="auto" />
                        )
                    })}
                </Slider>
            </Col>
            <Col  style={{ overflow: 'hidden' }} className="right-banner">
                <img className="imgsmall" src="../../image/right1.png" alt='right1'></img>
                <img className="imgsmall" src="../../image/right2.png" alt='right2'></img>
            </Col>
        </WrapperBanner>
    )
}

export default Slide;
