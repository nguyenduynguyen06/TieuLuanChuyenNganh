import React, { useEffect, useState } from "react";
import { WrapperBrandList } from "./style";
import axios from "axios";
import { useParams } from "react-router-dom";

const ListBrand = () => {
    const { nameCategory } = useParams();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState(null); 

    useEffect(() => {
        const fetchCategoryByName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
                if (response.data.data) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh mục theo tên:', error);
            }
        };
        fetchCategoryByName();
    }, []);

    useEffect(() => {
        if (categories) {
            const category = categories.find((cat) => cat.name === nameCategory);
            if (category) { 
                const categoryId = category._id;
                fetchBrandsByCategory(categoryId);
            }
        }
    }, [categories, nameCategory]);

    const fetchBrandsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
            setBrands(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thương hiệu theo danh mục:', error);
        }
    };

    const handleCardClick = (name) => {
        window.location.href = `/type/${nameCategory}/${name}`;
    };

    return (
        <WrapperBrandList>
            <div className="brand-content">
                <div className="list-brand">
                    {brands.filter((brand) => brand.isHide === false).map((brand) => (
                        <a className="list-brand-item" onClick={() => handleCardClick(brand.name)}>
                            <img className="brand-img" src={brand.picture} alt={brand.name} />
                        </a>
                    ))}
                </div>
            </div>
        </WrapperBrandList>
    )
}

export default ListBrand;
