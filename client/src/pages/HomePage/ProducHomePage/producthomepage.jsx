import React, { useState, useEffect, useRef } from 'react';
import { WrapperButtonMore, WrapperCard } from '../styled';
import axios from 'axios';
import { Button } from 'antd';
import ButtonComponent from '../../../Components/ButtonComponent/ButtonComponent';
import { Link, NavLink } from 'react-router-dom';
import { FitScreen } from '@mui/icons-material';

function ProductHomePage() {
  const [products, setProducts] = useState([]);
  const [selectedMemories, setSelectedMemories] = useState({});
  const [cardsToShow, setCardsToShow] = useState(); // Initial number of cards to show, you can change this value
  const mainContainerRef = useRef(null);

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
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };
    fetchData();
  }, []);

  const calculateCardsPerRow = () => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const containerWidth = mainContainer.offsetWidth;
    const cardWidth = 200; // Width of each card

    return Math.floor(containerWidth / cardWidth); // Calculate the number of cards per row
  };
  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (!mainContainer) return;

    const containerWidth = mainContainer.offsetWidth;
    const cardWidth = 200; // Width of each card

    const cardsPerRow = Math.floor(containerWidth / cardWidth); // Calculate the number of cards per row
    setCardsToShow(cardsPerRow); // Set the number of cards to show initially
  }, [mainContainerRef]);


  const buttonStyle = {
    border: '1px solid #ff3300',
    color: '#ff3300',
    width: '240px',
    height: '38px',
    borderRadius: '4px',
    fontWeight: 500,
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff3300',
    color: 'white',
    width: '240px',
    height: '38px',
    borderRadius: '4px',
    fontWeight: 500,
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardsPerRow = calculateCardsPerRow(); // Calculate the number of cards per row

  const hasMoreProducts = products.length > cardsToShow;

  return (
    <WrapperCard>
      <img className='imgtt' src="..\..\image\bannerpd.jpg" style={{ width: '100%' }} alt='title'></img>
      <div className='mainContainer' ref={mainContainerRef} style={{alignItems: 'center',paddingLeft:'3%'}}>
        {products
          .filter((product) => product.isHide === false)
          .slice(0, cardsToShow)
          .map((product) => (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <div className='box' key={product._id} style={{display: 'flex'}}>
              <div className='card'>
                <NavLink className="image" to={`/product/${product.name}/${selectedMemories[product._id]}`}>
                  <img src={product.thumnails[0]} />
                </NavLink>
                <div className='desc'>
                  <h1>{product?.name}</h1>
                  <div>
                    {product?.variant.map((variant) => (
                      <Button
                        className={` memory-button ${variant.memory === selectedMemories[product._id] ? 'selected' : ''}`}
                        onClick={() => {
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
                    <div style={{ margin: 0 }}>
                      <p style={{ fontWeight: 700, height: '20px' }}>
                        {product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div style={{}}>
                      <p style={{ color: '#000', textDecoration: 'line-through', height: '20px' }}>{product?.variant.find((variant) => variant.memory === selectedMemories[product._id])?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
      </div>
      {hasMoreProducts && (

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <WrapperButtonMore
          textButton="Xem thêm"
          type="outline"
          styleButton={isButtonHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => {
            setCardsToShow(cardsToShow + cardsPerRow); // Increase the number of cards to show
          }}
        >
          Xem thêm
        </WrapperButtonMore>
      </div>
      )}
    </WrapperCard>
  );
}

export default ProductHomePage;
