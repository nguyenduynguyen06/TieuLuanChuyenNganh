import React , {useState, useEffect} from "react"
import { Col, Row, Table } from 'antd'
import imageProduct from '../../image/ip15.webp'
import imageSmall from '../../image/ip15_2.webp'
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
const { Column, ColumnGroup } = Table;

const ProductDetailComponents = () => {
    const onChange = () => { }
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
    <h3 class="ql-align-justify"><strong>Thiết kế vuông vắn sang trọng</strong></h3>
    <p class="ql-align-justify">iPhone 15 Pro Max vẫn giữ kiểu dáng vuông vắn và góc cạnh giống như những phiên bản trước đây, cách làm này mang đến cái nhìn sang trọng và thời thượng nhằm giúp bạn tỏa sáng dù ở bất kỳ nơi đâu mỗi khi cầm điện thoại trên tay.</p>
    <p class="ql-align-justify">&nbsp;Đối với phần khung bao quanh thân máy, năm nay Apple đã không còn sử dụng thép không gỉ nữa mà thay vào đó là chất liệu titanium, điều này mang lại sự tối ưu về khối lượng, song cũng mang lại hiệu quả về mặt độ bền nhờ độ cứng cáp tốt hơn, giảm thiểu mức độ rủi ro khi va đập hoặc xây xát điện thoại.</p>
    <p class="ql-align-justify"><br></p>
    <p class="ql-align-justify"><a href="https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-130923-102854.jpg" rel="noopener noreferrer" target="_blank" style="color: rgb(47, 128, 237);"><img src="https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-130923-102854.jpg" alt="Thiết kế điện thoại - iPhone 15 Pro Max"></a></p>
    <h3 class="ql-align-justify"><strong>Thiết kế vuông vắn sang trọng</strong></h3>
    <p class="ql-align-justify">iPhone 15 Pro Max vẫn giữ kiểu dáng vuông vắn và góc cạnh giống như những phiên bản trước đây, cách làm này mang đến cái nhìn sang trọng và thời thượng nhằm giúp bạn tỏa sáng dù ở bất kỳ nơi đâu mỗi khi cầm điện thoại trên tay.</p>
    <p class="ql-align-justify">&nbsp;Đối với phần khung bao quanh thân máy, năm nay Apple đã không còn sử dụng thép không gỉ nữa mà thay vào đó là chất liệu titanium, điều này mang lại sự tối ưu về khối lượng, song cũng mang lại hiệu quả về mặt độ bền nhờ độ cứng cáp tốt hơn, giảm thiểu mức độ rủi ro khi va đập hoặc xây xát điện thoại.</p>
    <p class="ql-align-justify"><br></p>
    <p class="ql-align-justify"><a href="https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-130923-102854.jpg" rel="noopener noreferrer" target="_blank" style="color: rgb(47, 128, 237);"><img src="https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-130923-102854.jpg" alt="Thiết kế điện thoại - iPhone 15 Pro Max"></a></p>
    `;
  
  return (
        <div>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <WrapperStyleImageBig src={imageProduct} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageSmall} alt="image small" preview={false} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>IPhone 15 Pro Max</WrapperStyleNameProduct>
                    <div>
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
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
                        <ProductDescription description={productDescription}/>
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
            <Row>
                BÌNH LUẬN
            </Row>
        </div>
    )
}

export default ProductDetailComponents;