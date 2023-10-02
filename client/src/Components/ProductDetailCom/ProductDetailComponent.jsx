import React from "react"
import {Col, Row, Image, InputNumber, Button} from 'antd'
import imageProduct from '../../image/ip15.webp'
import imageSmall from '../../image/ip15_2.webp'
import { WrapperStyleColImage, 
        WrapperStyleImageSmall, 
        WrapperStyleImageBig, 
        WrapperStyleNameProduct, 
        WrapperStyleTextSell, 
        WrapperPriceTextProduct, 
        WrapperPriceProduct,
        WrapperAddressProduct, 
        WrapperQuantityProduct,
        WrapperInputNumber,
        } from "./style"
import {StarFilled, PlusOutlined, MinusOutlined} from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent"

const ProductDetailComponents = () => {
    const onChange = () => {}
    return (
        <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}}>
            <Col span={10} style={{border: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <WrapperStyleImageBig src={imageProduct} alt="image product" preview={false}/>
                <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>IPhone 15 Pro Max</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}}/>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}}/>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}}/>
                    <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        36.990.000 đ
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className="address">Mỹ Hòa, H.Ba Tri, T.Bến Tre</span> - 
                    <span className="change-address">Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{margin: '10px 0 20px', padding: '10px 0',borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{marginBottom: '10px'}}>Số lượng:</div>
                    <WrapperQuantityProduct>
                        <button style={{border: 'none', background: 'transparent'}}>
                            <MinusOutlined style={{color: '#000', fontSize: '20px'}}/>
                        </button>
                            <WrapperInputNumber /*min={1} max={10}*/ defaultValue={3} onChange={onChange} size="small"/>
                        <button style={{border: 'none', background: 'transparent'}}>
                            <PlusOutlined style={{color: '#000', fontSize: '20px'}}/>
                        </button>
                    </WrapperQuantityProduct>
                </div >
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
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
                        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}>
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
                        styleTextButton={{color: 'rgb(13,92,182)', fontSize: '15px'}}>
                    </ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailComponents;