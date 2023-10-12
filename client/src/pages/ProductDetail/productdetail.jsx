import React from "react"
import ProductDetailComponents from "../../Components/ProductDetailCom/ProductDetailComponent";

const ProductDetail = () =>{
    return (
        <div style={{padding: '0 120px', background: '#fff', height: 'auto'}}>
            <h3>Chi tiết sản phẩm</h3>
                <ProductDetailComponents/>
        </div>
    )
}

export default ProductDetail;