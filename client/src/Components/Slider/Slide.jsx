import Slider from "react-slick";
import { Image } from 'antd';
import React from 'react'
import Slider1 from "../../image/slide1.png"
import Slider2 from "../../image/slide2.png"
import Slider3 from "../../image/slide3.png"
const arrImage = [Slider1, Slider2, Slider3];
const Slide = () => {
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