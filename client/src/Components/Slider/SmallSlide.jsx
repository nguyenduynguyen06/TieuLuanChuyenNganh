import Slider from "react-slick";
import { Button, Carousel } from 'antd';
import React, { useState } from 'react';

import { WrapperBanner } from "./style";
import Slider1 from "../../image/small1.png";
import Slider2 from "../../image/small2.png";
const arrImage = [Slider1, Slider2];

const SmallSlide = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <WrapperBanner>
            <Carousel className="custom-carousel" {...settings} autoplay arrows>
                {arrImage.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index}`} style={{ borderRadius: '4px', width: '100%', height: '100%'}} />
                    </div>
                ))}
            </Carousel>
        </WrapperBanner>
    )
}

export default SmallSlide;
