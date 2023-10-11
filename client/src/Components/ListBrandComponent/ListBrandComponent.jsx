import React, { useEffect, useState } from "react";
import { WrapperBrandList } from "./style";
import axios from "axios";
const ListBrand = () => {
    const [brand, setBrands] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`);
                setBrands(response.data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCardClick = (name) => {
        window.location.href = `/type/${name}`;
    };
    return (
        <WrapperBrandList style={{}}>
            <div className="brand-content">
                <div className="list-brand">
                    {brand.filter((brands) => brands.isHide === false).map((brands) => (

                        <a className="list-brand-item" href="#">
                            <img className="brand-img" src={brands.picture} alt="Apple" />
                        </a>
                    ))}
                </div>
            </div>
        </WrapperBrandList>
    )
}

export default ListBrand