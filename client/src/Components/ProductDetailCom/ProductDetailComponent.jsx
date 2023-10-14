import React, { useState, useEffect } from "react"
import { Button, Col, Image, Row, Table, Rate } from 'antd'
import {
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleImageBig,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperPriceTextProduct,
    WrapperPriceProduct,
    WrapperAddressProduct,
    WrapperQuantityProduct,
    WrapperInputNumber,
    WrapperPropTable,
    WrapperSeeMore,
    WrapperDetail,
} from "./style"
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import ProductDescription from "./productdesscription"
import CommentBox from "./commentcomponent"
import axios from "axios"
import { useParams } from "react-router-dom"
import './button.css'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const { Column, ColumnGroup } = Table;

const ProductDetailComponents = () => {

    const [productDetails, setProductDetails] = useState(null);
    const { productName, memory } = useParams();
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSold, setSelectedSold] = useState({});
    const [selectedMemories, setSelectedMemories] = useState({});
    const sliderSettings = {
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
            </ul>)
    };

    useEffect(() => {
        if (memory !== `undefined`) {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getDetails/${productName}/${memory}`)
                .then((response) => {
                    const productDetails = response.data.data;
                    setProductDetails(productDetails);

                    const defaultMemory = memory;

                    const initialMemories = {
                        [productDetails._id]: defaultMemory
                    };

                    setSelectedMemories(initialMemories);

                    // Lấy màu đầu tiên từ attributes của variant
                    if (productDetails && productDetails.variant) {
                        productDetails.variant.forEach((variant) => {
                            if (variant.memory === defaultMemory && variant.attributes && variant.attributes.length > 0) {
                                const defaultColor = variant.attributes[0].color;
                                setSelectedColor((prevSelected) => ({
                                    ...prevSelected,
                                    [variant._id]: defaultColor,
                                }));

                                // Cập nhật Sold tương ứng
                                const selectedAttribute = variant.attributes.find((attribute) => attribute.color === defaultColor);
                                if (selectedAttribute) {
                                    setSelectedSold((prevSelected) => ({
                                        ...prevSelected,
                                        [variant._id]: selectedAttribute.sold,
                                    }));
                                }
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                });
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/product/getDetails/${productName}/${memory}`)
                .then((response) => {
                    const productDetails = response.data.data;
                    setProductDetails(productDetails);

                    const initialMemories = {
                        [productDetails._id]: productDetails.variant[0].memory
                    };

                    setSelectedMemories(initialMemories);


                    if (productDetails && productDetails.variant) {
                        productDetails.variant.forEach((variant) => {
                            if (variant.memory === productDetails.variant[0].memory && variant.attributes && variant.attributes.length > 0) {
                                const defaultColor = variant.attributes[0].color;
                                setSelectedColor((prevSelected) => ({
                                    ...prevSelected,
                                    [variant._id]: defaultColor,
                                }));


                                const selectedAttribute = variant.attributes.find((attribute) => attribute.color === defaultColor);
                                if (selectedAttribute) {
                                    setSelectedSold((prevSelected) => ({
                                        ...prevSelected,
                                        [variant._id]: selectedAttribute.sold,
                                    }));
                                }
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                });
        }
    }, [productName, memory]);




    const onChange = (value) => { }
    const columns = [
        {
            title: '',
            dataIndex: 'prop',
            key: 'prop',
        },
        {
            title: '',
            dataIndex: 'info',
            key: 'info',
        },
    ];

    const dataSource = productDetails && productDetails.properties
        ? Object.keys(productDetails.properties).map((propertyKey) => ({
            key: propertyKey,
            prop: propertyKey,
            info: productDetails.properties[propertyKey] || 'N/A',
        }))
        : [];
    if (memory !== `undefined`) {
        dataSource.unshift({
            key: '0',
            prop: 'Dung lượng lưu trữ',
            info: memory,
        });
    }
    const handleMemoryClick = (newMemory) => {
        const newUrl = `/product/${productName}/${newMemory}`;
        window.location.href = newUrl
    };

    return (
        <WrapperDetail>
            <Row style={{ padding: '15px 12px' }}>
                {productDetails ? (
                    memory !== `undefined` ? (
                        <WrapperStyleNameProduct style={{ fontWeight: 'bold' }}>
                            {productDetails.name} {memory}
                        </WrapperStyleNameProduct>
                    ) : (
                        <div>
                            <WrapperStyleNameProduct style={{ fontWeight: 'bold' }}>{productDetails.name}</WrapperStyleNameProduct>
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </Row>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={14} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Slider {...sliderSettings} className="slider">
                        {productDetails && productDetails.thumnails.map((thumbnail, index) => (
                            <WrapperStyleImageBig key={index}>
                                <div style={{display: 'flex', justifyContent:'center'}}>                                
                                    <Image src={thumbnail} alt={`Thumbnail ${index}`} className="slider-image" />
                                </div>
                            </WrapperStyleImageBig>
                        ))}
                    </Slider>
                    <Row style={{ paddingTop: '10px', justifyContent: 'flex-start' }}>
                        {productDetails && productDetails.variant && selectedMemories[productDetails._id] ? (
                            productDetails.variant
                                .filter((variant) => variant.memory === selectedMemories[productDetails._id])
                                .map((variant) =>
                                    variant.attributes ? (
                                        variant.attributes.map((attribute, attributeIndex) => (
                                            <WrapperStyleColImage key={attributeIndex} span={3}>
                                                <WrapperStyleImageSmall src={attribute.pictures} alt={`Attribute ${attributeIndex}`} preview={false} />
                                            </WrapperStyleColImage>
                                        ))
                                    ) : null
                                )
                        ) : null}
                    </Row>
                </Col>
                <Col span={10} style={{ paddingLeft: '10px' }}>
                    <div style={{ padding: '0 0 10px' }}>
                        {productDetails?.variant.map((variant) => (
                            variant?.memory && (
                                <Button
                                    className={` memory-button ${variant?.memory === selectedMemories[productDetails._id] ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedMemories((prevSelected) => ({
                                            ...prevSelected,
                                            [productDetails._id]: variant?.memory,
                                        }));
                                        handleMemoryClick(variant.memory)
                                    }}
                                    style={{ padding: '5px 5px', marginInlineEnd: '5px' }}>
                                    {variant?.memory}
                                </Button>
                            )
                        ))}
                    </div>
                    <div >
                        {productDetails?.variant.map((variant) => {
                            if (variant.attributes && variant.attributes.length > 0) {
                                const colors = variant.attributes.map((attribute) => attribute.color);
                                const uniqueColors = [...new Set(colors)];
                                if (variant.memory === selectedMemories[productDetails._id]) {
                                    return (
                                        <div style={{ padding: '10xp' }} key={variant._id}>
                                            {uniqueColors.map((color, index) => (
                                                <Button
                                                    key={index}
                                                    className={`memory-button ${color === selectedColor[variant._id] ? 'selected' : ''
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedColor((prevSelected) => ({
                                                            ...prevSelected,
                                                            [variant._id]: color,
                                                        }));
                                                        const selectedAttribute = variant.attributes.find(
                                                            (attribute) => attribute.color === color
                                                        );
                                                        if (selectedAttribute) {
                                                            setSelectedSold((prevSelected) => ({
                                                                ...prevSelected,
                                                                [variant._id]: selectedAttribute.sold,
                                                            }));
                                                            console.log('selectedSold', selectedSold[variant._id])
                                                        } else {
                                                            setSelectedSold((prevSelected) => ({
                                                                ...prevSelected,
                                                                [variant._id]: 'N/A',
                                                            }));
                                                        }
                                                    }}
                                                    style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                                                >
                                                    {color}
                                                </Button>
                                            ))}
                                            <div> <WrapperStyleTextSell>Sold: {selectedSold[variant._id]}</WrapperStyleTextSell></div>
                                        </div>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>

                    {productDetails ? (
                        <WrapperPriceProduct>
                            <WrapperPriceTextProduct>
                                {productDetails?.variant.find((variant) => variant.memory === selectedMemories[productDetails._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </WrapperPriceTextProduct>
                        </WrapperPriceProduct>
                    ) : (
                        <p>Loading...</p>
                    )}
                    {productDetails ? (
                        <WrapperPriceProduct style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>

                            {productDetails?.variant.find((variant) => variant.memory === selectedMemories[productDetails._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}

                        </WrapperPriceProduct>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className="address">Mỹ Hòa, H.Ba Tri, T.Bến Tre</span> -
                        <span className="change-address">Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng:</div>
                        <WrapperQuantityProduct>
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber /*min={1} max={10}*/ defaultValue={3} onChange={onChange} size="small" />
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQuantityProduct>
                    </div >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: 'rgb(225,57,69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua ngay'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                        <ButtonComponent
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13,92,182)',
                                borderRadius: '4px'
                            }}
                            textButton={'Thêm vào giỏ'}
                            styleTextButton={{ color: 'rgb(13,92,182)', fontSize: '15px' }}>
                        </ButtonComponent>
                    </div>
                </Col>
            </Row>
            <hr className="my-4" />
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={16} style={{ border: '1px solid #e5e5e5', padding: '10px', borderRadius: '4px' }}>
                    <h3>Mô tả sản phẩm</h3>
                    <div style={{ height: '600px', overflowY: 'scroll', overflowX: 'scroll', textAlign: 'justify' }}>
                        {productDetails ? (
                            <ProductDescription description={productDetails.desc} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '10px', textAlign: 'center' }}>
                    <WrapperPropTable dataSource={dataSource} pagination={false}>
                        <ColumnGroup title="Thông số kỹ thuật">
                            <Column dataIndex="prop" key="prop" />
                            <Column dataIndex="info" key="info" />
                        </ColumnGroup>
                    </WrapperPropTable>
                    {/* <WrapperSeeMore>
                        <a href="#">Xem toàn bộ thông số</a>
                    </WrapperSeeMore> */}
                </Col>
            </Row>
            <hr className="my-4" />
            <Row >
                <CommentBox />
            </Row>
            <hr className="my-4" />
        </WrapperDetail>
    )
}

export default ProductDetailComponents;