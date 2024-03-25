import React, { useRef } from "react";
import {ArrowRightOutlined } from '@ant-design/icons';
import { WrapperA } from "./style";


const About = () => {
    const aboutRef = useRef(null);

    return (
        <WrapperA id="about" ref={aboutRef}>
            <div className="about-section-container">
                <div className="about-background-image-container">
                    <img src="../../image/about-background.png" alt="" />
                </div>
                <div className="about-section-image-container">
                    <img src="../../image/about-background-image.png" alt="" />
                </div>
                <div className="about-section-text-container">
                    <p className="primary-subheading">VỀ CHÚNG TÔI</p>
                    <h1 className="primary-heading">
                        Chào mừng đến với Cửa hàng Di Động Gen Z!
                    </h1>
                    <p className="primary-text">
                        Chúng tôi là một cửa hàng chuyên cung cấp các sản phẩm điện thoại di động chất lượng hàng đầu.
                        Với nhiều năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng với giá cả hợp lý nhất.
                    </p>
                    <p className="primary-text">
                        Chúng tôi tự hào là địa chỉ đáng tin cậy cho mọi nhu cầu sử dụng điện thoại di động của bạn.
                        Hãy khám phá các sản phẩm mới nhất và đa dạng nhất tại cửa hàng của chúng tôi ngay hôm nay!
                    </p>
                    <div className="about-buttons-container">
                        <button className="secondary-button">
                            Khám phá ngay <ArrowRightOutlined />
                        </button>
                    </div>
                </div>
            </div>
        </WrapperA>
    );
};

export default About;