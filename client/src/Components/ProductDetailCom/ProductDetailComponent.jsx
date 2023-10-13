import React , {useState, useEffect} from "react"
import { Button, Col, Row, Table } from 'antd'
import imageProduct from '../../image/ip15.webp'
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
} from "./style"
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent"
import ProductDescription from "./productdesscription"
import CommentBox from "./commentcomponent"
import axios from "axios"
import { useParams } from "react-router-dom"
const { Column, ColumnGroup } = Table;

const ProductDetailComponents = () => {
    const [productDetails, setProductDetails] = useState(null);
    const { productName, memory } = useParams();
    const [selectedMemories, setSelectedMemories] = useState({});
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/getDetails/${productName}/${memory}`)
            .then((response) => {
                const productDetails = response.data.data;
                setProductDetails(productDetails);
                const initialMemories = {};
                productDetails.forEach((product) => {
                    initialMemories[product._id] = memory;
                });
                setSelectedMemories(initialMemories);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [productName, memory]);

    const onChange = (value) => {
        setSelectedQuantity(value);
    }
    const handleColorClick = (color) => {
        const selectedMemory = selectedMemories[productDetails._id];
        const selectedVariant = productDetails.variant.find(
            (variant) => variant.memory === selectedMemory
        );
        if (selectedVariant && selectedVariant.attributes) {
            const colorQuantity = selectedVariant.attributes
                .filter((attribute) => attribute.color === color)
                .reduce((acc, attribute) => acc + attribute.quantity, 0);
            setSelectedQuantity(colorQuantity);
        }

        // Cập nhật màu đã chọn
        setSelectedColor(color);
    }
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

    const dataSource = [
        {
            key: '1',
            prop: 'Kích thước màn hình',
            info: '6.1 inches',
        },
        {
            key: '2',
            prop: 'Công nghệ màn hình',
            info: 'Super Retina XDR OLED',
        },
        {
            key: '3',
            prop: 'Camera sau',
            info: 'Camera chính: 48MP\nCamera góc rộng: 12MP\nCamera Tele: 12MP',
        },
        {
            key: '4',
            prop: 'Camera trước',
            info: '12MP',
        },
        {
            key: '5',
            prop: 'Chipset',
            info: 'Apple A16 Bionic',
        },
    ];
    const productDescription = `
        
    `
  
  return (
        <div>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <WrapperStyleImageBig src={imageProduct} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                                {productDetails && productDetails.variant ? (
                    productDetails.variant.map((variants) => (
                        variants.attributes ? (
                            variants.attributes.map((attribute, attributeIndex) => (
                                <WrapperStyleColImage key={attributeIndex} span={4}>
                                    <WrapperStyleImageSmall src={attribute.pictures} alt={`Attribute ${attributeIndex}`} preview={false} />
                                </WrapperStyleColImage>
                            ))
                        ) : null
                    ))
                ) : null}
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                {productDetails ? (
                    <WrapperStyleNameProduct>{productDetails.name}</WrapperStyleNameProduct>
                    ) : (
                        <p>Loading...</p>
                    )}
                     {productDetails ? (
                    <div>
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <WrapperStyleTextSell>{productDetails.sold}</WrapperStyleTextSell>
                    </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        {productDetails?.variant.map((variant) => (
                            variant.memory && (  
                            <Button
                                className={` memory-button ${variant.memory === selectedMemories[productDetails._id] ? 'selected' : ''}`}
                                onClick={() => {
                                setSelectedMemories((prevSelected) => ({
                                    ...prevSelected,
                                    [productDetails._id]: variant.memory,
                                }));
                                }}
                                style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                            >
                                {variant.memory}
                            </Button>
                            )
                        ))}
                        <div>
                            {productDetails?.variant.map((variant) => {
                                if (variant.attributes && variant.attributes.length > 0) {
                                    // Lấy danh sách màu từ mảng attributes
                                    const colors = variant.attributes.map((attribute) => attribute.color);  
                                    const uniqueColors = [...new Set(colors)];

                                    if (variant.memory === selectedMemories[productDetails._id]) {
                                        return uniqueColors.map((color, index) => (
                                            <Button
                                                key={index}
                                                className={` memory-button ${color === selectedColor[variant._id] ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedMemories((prevSelected) => ({
                                                        ...prevSelected,
                                                        [variant._id]: color,
                                                    }));
                                                }}
                                                style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                                            >
                                                {color}
                                            </Button>
                                        ));
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
                    <WrapperPriceProduct  style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>
                     
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
                        <div style={{height:'600px', overflowY: 'scroll', overflowX: 'scroll', textAlign: 'justify'}}>
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
                    <WrapperSeeMore>
                        <a href="#">Xem toàn bộ thông số</a>
                    </WrapperSeeMore>
                </Col>
            </Row>
            <hr className="my-4" />
            <Row >
                <CommentBox/>
            </Row>
            <hr className="my-4" />

        </div>
    )
}

export default ProductDetailComponents;