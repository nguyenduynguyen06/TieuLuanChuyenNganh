import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink, useParams } from 'react-router-dom';


import { Button, Rate, Skeleton, Tooltip } from 'antd';
import { CardProd, WrapperCardProd } from '../../pages/HomePage/styled';
import Loading from '../LoadingComponents/Loading';

function SaleProduct() {
  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        const categories = res.data.data;
        const categoryName = 'Điện thoại';
        const category = categories.find((cat) => cat.name === categoryName);
        if (!category) {
          console.error('Không tìm thấy danh mục');
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getIdByCategory/${category._id}`);
        const productsData = response.data.data;
        setProducts(productsData);

        const initialMemories = {};
        productsData.forEach((product) => {
          initialMemories[product._id] = product.variant[0]?.memory;
        });

        setSelectedMemories(initialMemories);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((total, item) => total + item.rating, 0);
    return totalRating / ratings.length;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const PrevArrow = ({ onClick }) => {
    return <div className="slick-arrow slick-prev" onClick={onClick}></div>;
  };

  const NextArrow = ({ onClick }) => {
    return <div className="slick-arrow slick-next" onClick={onClick} ></div>;
  };
  const calculateDiscountPercentage = (newPrice, oldPrice) => {
    if (oldPrice) {
      const discount = oldPrice - newPrice;
      const discountPercentage = (discount / oldPrice) * 100;
      return discountPercentage.toFixed(0);
    } else {
      return 0;
    }
  };
  return (
    <CardProd>
      {loading ? (
        <Skeleton style={{ padding: 10, minHeight: '395px' }} active={true} />
      ) : (
        <Slider {...settings} prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
          {products
            .filter((product) => !product.isHide)
            .map((product) => (
              <div className='card' key={product._id}>
                <Tooltip title={product.name} mouseEnterDelay={0.5}>
                  <NavLink to={`/product/${product.name}/${selectedMemories[product._id]}`}>
                    {product.variant
                      .filter((variant) => variant.memory === selectedMemories[product._id])
                      .map((variant) => (
                        <div key={variant._id} className='item-label'>
                          {variant.oldPrice && (
                            <span className='lb-dis'>
                              Giảm {calculateDiscountPercentage(variant.newPrice, variant.oldPrice)}%
                            </span>
                          )}
                        </div>
                      ))}
                    <div className='image'>
                      <img src={product.thumnails[0]} alt={product.name} loading='lazy' />
                    </div>
                    <div className='desc'>
                      <h1 className='name'>{product.name}</h1>
                      <div>
                        {product?.variant.map((variant) => (
                          <Button classNames={'memory'} className={` memory-button ${variant.memory === selectedMemories[product._id] ? 'selected' : ''}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedMemories((prevSelected) => ({
                                ...prevSelected,
                                [product._id]: variant.memory,
                              }));
                            }}
                            style={{ padding: '5px 5px', marginInlineEnd: '5px' }}
                          >
                            {variant.memory}
                          </Button>
                        ))}

                        {product.ratings.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Rate disabled allowHalf value={calculateAverageRating(product.ratings)} />
                          </div>
                        ) : null}
                        <div style={{ fontWeight: 700, height: '20px', margin: 0 }}>
                          <p>
                            {product.variant.find((variant) => variant.memory === selectedMemories[product._id]).newPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </p>
                        </div>
                        <p style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>{product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                      </div>
                      <div className='div-img'>
                        <img className='image' src='https://res.cloudinary.com/doq4spvys/image/upload/v1713004455/e5zupd8flydfe2bslrvb.png' alt='promo' />
                      </div>
                    </div>
                  </NavLink>
                </Tooltip>
              </div>
            ))}
        </Slider>
      )}
    </CardProd>
  );
}

export default SaleProduct;
