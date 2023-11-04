import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Pagination, Rate } from 'antd';
import { WrapperCard, WrapperFilterCard } from './styled';
import { InfoCircleFilled } from '@ant-design/icons'

function FilterCard() {
  const { nameCategory, nameBrand } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const propertyNames = ["RAM", "Dung lượng pin", "Chip xử lý (CPU)"];
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const includeOldPrice = searchParams.get('includeOldPrice');
    const selectedMemory = searchParams.get('selectedMemory');
    if (nameCategory) {
      if (nameBrand) {
        if (minPrice !== null && maxPrice !== null || includeOldPrice !== null || selectedMemory !== null) {
          if (location.pathname.startsWith('/lowtoHigh')) {
            getProductsByCategoryAndBrandWithPrice(nameCategory, nameBrand, minPrice, maxPrice, includeOldPrice, selectedMemory);
          } else if (location.pathname.startsWith('/hightoLow')) {
            getProductsByCategoryAndBrandHightoLowWithPrice(nameCategory, nameBrand, minPrice, maxPrice, includeOldPrice, selectedMemory);
          }
        } else {
          if (location.pathname.startsWith('/lowtoHigh')) {
            getProductsByCategoryAndBrand(nameCategory, nameBrand);
          } else if (location.pathname.startsWith('/hightoLow')) {
            getProductsByCategoryAndBrandHightoLow(nameCategory, nameBrand);
          }
        }
      } else {
        if (minPrice !== null && maxPrice !== null || includeOldPrice !== null || selectedMemory !== null) {
          if (location.pathname.startsWith('/lowtoHigh')) {
            getProductsByCategoryNameWithPrice(nameCategory, minPrice, maxPrice, includeOldPrice, selectedMemory);
          } else if (location.pathname.startsWith('/hightoLow')) {
            getProductsByCategoryNameHightoLowWithPrice(nameCategory, minPrice, maxPrice, includeOldPrice, selectedMemory);
          }
        } else {
          if (location.pathname.startsWith('/lowtoHigh')) {
            getProductsByCategoryName(nameCategory);
          } else if (location.pathname.startsWith('/hightoLow')) {
            getProductsByCategoryNameHightoLow(nameCategory);
          }
        }
      }
    }

  }, [nameCategory, nameBrand, location.pathname]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const includeOldPrice = searchParams.get('includeOldPrice');
    const selectedMemory = searchParams.get('selectedMemory');

    if (
      (minPrice !== null && maxPrice !== null) ||
      includeOldPrice !== null ||
      selectedMemory !== null
    ) {
      if (location.pathname.startsWith('/lowtoHigh')) {
        if (nameBrand) {
          getProductsByCategoryAndBrandWithPrice(nameCategory, nameBrand, minPrice, maxPrice, includeOldPrice, selectedMemory);
        } else {
          getProductsByCategoryNameWithPrice(nameCategory, minPrice, maxPrice, includeOldPrice, selectedMemory);
        }
      } else if (location.pathname.startsWith('/hightoLow')) {
        if (nameBrand) {
          getProductsByCategoryAndBrandHightoLowWithPrice(nameCategory, nameBrand, minPrice, maxPrice, includeOldPrice, selectedMemory);
        } else {
          getProductsByCategoryNameHightoLowWithPrice(nameCategory, minPrice, maxPrice, includeOldPrice, selectedMemory);
        }
      }
    }
  }, [location.search]);
  const getProductsByCategoryName = async (categoryName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/${category._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);


    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  const getProductsByCategoryNameHightoLow = async (categoryName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/highToLow/${category._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);


    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  const getProductsByCategoryNameWithPrice = async (categoryName, minPrice, maxPrice, includeOldPrice, selectedMemory) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      let queryParams = `minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&includeOldPrice=${includeOldPrice || ''}&selectedMemory=${selectedMemory || ''}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/${category._id}?${queryParams}`
      );
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  const getProductsByCategoryNameHightoLowWithPrice = async (categoryName, minPrice, maxPrice, includeOldPrice, selectedMemory) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      let queryParams = `minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&includeOldPrice=${includeOldPrice || ''}&selectedMemory=${selectedMemory || ''}`;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/highToLow/${category._id}?${queryParams}`)
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  const getProductsByCategoryAndBrand = async (categoryName, brandName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const brandResponse = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`);
      const brandsData = brandResponse.data.data;
      const brand = brandsData.find((b) => b.name === brandName);
      if (!brand) {
        console.error('Không tìm thấy thương hiệu');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/${category._id}/${brand._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);

    } catch (error) {
      console.error('Lỗi:', error);
    }
  }

  const getProductsByCategoryAndBrandHightoLow = async (categoryName, brandName) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const brandResponse = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`);
      const brandsData = brandResponse.data.data;
      const brand = brandsData.find((b) => b.name === brandName);
      if (!brand) {
        console.error('Không tìm thấy thương hiệu');
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/highToLow/${category._id}/${brand._id}`
      );
      const productsData = response.data.data;
      setProducts(productsData);

    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
  const getProductsByCategoryAndBrandWithPrice = async (categoryName, brandName, minPrice, maxPrice, includeOldPrice, selectedMemory) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const brandResponse = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`);
      const brandsData = brandResponse.data.data;
      const brand = brandsData.find((b) => b.name === brandName);
      if (!brand) {
        console.error('Không tìm thấy thương hiệu');
        return;
      }
      let queryParams = `minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&includeOldPrice=${includeOldPrice || ''}&selectedMemory=${selectedMemory || ''}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/${category._id}/${brand._id}?${queryParams}`
      );
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  const getProductsByCategoryAndBrandHightoLowWithPrice = async (categoryName, brandName, minPrice, maxPrice, includeOldPrice, selectedMemory) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
      const categories = res.data.data;
      const category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        console.error('Không tìm thấy danh mục');
        return;
      }
      const brandResponse = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand`);
      const brandsData = brandResponse.data.data;
      const brand = brandsData.find((b) => b.name === brandName);
      if (!brand) {
        console.error('Không tìm thấy thương hiệu');
        return;
      }
      let queryParams = `minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&includeOldPrice=${includeOldPrice || ''}&selectedMemory=${selectedMemory || ''}`;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/filter/highToLow/${category._id}/${brand._id}?${queryParams}`
      );
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const calculateAverageRating = (product) => {
    if (product.length === 0) {
      return 0;
    }

    const totalRating = product.reduce((total, item) => total + item.rating, 0);
    return totalRating / product.length;
  }
  const calculateTotalRatings = (product) => {
    if (!product || !product.ratings) {
      return 0;
    }

    return product.ratings.length;
  }


  return (
    <div>
      <WrapperFilterCard>
        <div className='mainContainer' style={{ alignItems: 'center', justifyContent: 'center' }}>
          {currentProducts
            .filter((product) => product.isHide === false)
            .map((product) => (
              product.variant.map((variant) => (
                <div className='box' key={product._id + variant.memory} style={{ padding: '0' }}>
                  <div className='card'>
                    <NavLink className='image' to={`/product/${product.name}/${variant.memory}`}>
                      <img src={product.thumnails[0]} />
                    </NavLink>
                    <div className='desc'>
                      <div style={{ height: '3em' }}>
                        <h1 style={{ padding: 3 }}>{product.name} - {variant.memory}</h1>
                      </div>
                      <div>
                        {product?.ratings.length > 0 ? (
                          <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Rate disabled allowHalf value={calculateAverageRating(product.ratings)} />
                            <span style={{ margin: 0, height: '25px', fontSize: '13px' }}>Lượt đánh giá: {calculateTotalRatings(product)}</span>
                          </div>
                        ) : (
                          null
                        )}
                        <div style={{ padding: '0 0 30px 0' }}>
                          <p style={{ fontWeight: 700, height: '20px' }}>
                            {variant.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </p>
                          <p style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>
                            {variant.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </p>
                        </div>
                        <div>
                          {propertyNames.map((propertyName, index) => {
                            const propertyValue = product?.properties?.[propertyName];
                            if (propertyValue !== undefined) {
                              return (
                                <div style={{padding:'0 7px', display: 'flex', alignItems: 'center' }}>
                                  <i class="fas fa-circle" style={{ fontSize: 3 }}></i>
                                  <p key={index} style={{ fontSize: '13px', color: 'black', textAlign: 'left', paddingLeft: '10px', margin: '0', lineHeight: '19px' }}>
                                    {propertyName}: {propertyValue}
                                  </p>
                                </div>
                              );
                            }
                            return null; // To skip properties that don't exist in the product data
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ))}
        </div>
      </WrapperFilterCard>
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        current={currentPage}
        total={products.length}
        pageSize={productsPerPage}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      />
    </div>

  );
}

export default FilterCard;
