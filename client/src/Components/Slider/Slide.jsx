import Slider from "react-slick";
import { Image } from 'antd';
import React from 'react'
import './but.css'

const Slide = ({arrImage}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      };
  return (
    <Slider {...settings}>
        {arrImage.map((image) => {
            return(
                <Image src={image} alt='slider' preview={false} width="100%"/>
            )
        })}
    </Slider>
  )
}

export default Slide