import Slider from "react-slick";
import { Button, Carousel } from 'antd';
import React, { useState } from 'react';
import Slider1 from "../../image/ak.png";
import Slider2 from "../../image/ak.png";
import Slider3 from "../../image/ak.png";
import Slider4 from "../../image/ak.png";
import { CarouselW, WrapperBanner } from "./style";

const arrImage = [Slider1, Slider2, Slider3, Slider4];

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
            <CarouselW className="custom-carousel" {...settings} autoplay arrows>
                {arrImage.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index}`} style={{ borderRadius: '4px', objectFit: 'cover' }} />
                ))}
            </CarouselW>
    )
}

export default Slide;
