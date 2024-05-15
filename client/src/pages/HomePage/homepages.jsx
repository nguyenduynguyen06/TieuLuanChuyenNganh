import React, { useEffect, useState } from "react";
import { WrapperHome, WrapperHomePage } from "./styled";
import axios from "axios";
import Header from "../../Components/Header/header";
import { MDBIcon } from 'mdb-react-ui-kit';
import { Skeleton, Menu } from 'antd';
import SubMenu from "antd/es/menu/SubMenu";
import { NavLink } from "react-router-dom";
import Slide from "../../Components/Slider/Slide";
import SmallSlide from "../../Components/Slider/SmallSlide";
import SaleProduct from "../../Components/Slider/saleProduct";
import { EllipsisOutlined } from '@ant-design/icons';
import ProductHP from "../../Components/HomePageComponent/ProductHPCom";
import CaseHP from "../../Components/HomePageComponent/CaseHPCom";
import ChargerHP from "../../Components/HomePageComponent/ChargerHPCom";
import PinHP from "../../Components/HomePageComponent/PinHPCom";
import HeadphoneHP from "../../Components/HomePageComponent/HeadphoneHPCom";

const HomePage = () => {
  const [brands, setBrands] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(false);

  const [menuMode, setMenuMode] = useState('vertical');
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const checkScreenWidth = () => {
    if (window.innerWidth <= 1200) {
      setMenuMode('horizontal');
    } else {
      setMenuMode('vertical');
    }
  };
  useEffect(() => {
    document.title = "Di Động Gen Z | Trang Chủ";

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const handleMenuClick = (e) => {
    console.log('Clicked:', e.key);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        const allCategories = response.data.data;
        const filteredCategories = allCategories.filter(category => !category.isHide);
        setCategories(filteredCategories);
        setLoading(false)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
        setLoading(false)
      }
    };
    fetchCategories();
  }, []);

  const fetchBrands = async (categoryId) => {
    try {
      setLoadingBrand(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrand/${categoryId}`);
      setBrands(prevState => ({
        ...prevState,
        [categoryId]: response.data.data
      }));
      setLoadingBrand(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setLoadingBrand(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleCategoryMouseEnter = async (categoryId) => {
    if (categoryId !== currentCategoryId) {
      setCurrentCategoryId(categoryId);
      await fetchBrands(categoryId);
    }
  };

  const handleCategoryMouseLeave = () => {
    setCurrentCategoryId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#eee', alignItems: 'center' }}>
      <Header></Header>
      <WrapperHome>
        <div className="first-containter" >
          <div className="menu-tab" >
            {loading ? (
              <Skeleton style={{ padding: 10, minHeight: '50vh' }} active={true} />
            ) : (<Menu onClick={handleMenuClick} mode={menuMode} overflowedIndicator={<EllipsisOutlined />}
              style={{ fontSize: '13pt', borderRadius: '4px', overflowY: 'auto', scrollbarWidth: "none", maxHeight: '100vh' }}>

              {categories.map(category => (
                <SubMenu key={category._id} title={category.name}
                  onMouseEnter={() => handleCategoryMouseEnter(category._id)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <Menu.Item>
                    <NavLink to={`/products/${category.name}`}>
                      Tất cả sản phẩm
                    </NavLink>
                  </Menu.Item>
                  {loadingBrand ? (
                    <Menu.Item key={`${category._id}-loading`}>
                      <Skeleton style={{ padding: 10 }} active={true} />
                    </Menu.Item>
                  ) : brands[category._id] ? (
                    brands[category._id].map(brand => (
                      <Menu.Item key={`${category._id}-${brand._id}`}>
                        <NavLink to={`/products/${category.name}/${brand.name}`}>
                          {brand.name}
                        </NavLink>
                      </Menu.Item>
                    ))
                  ) : null}
                </SubMenu>
              ))}
            </Menu>
            )}
          </div>
          <div className="banner-tab">
            {loading ? (
              <Skeleton style={{ padding: 10 , minHeight: '50vh' }} active={true} />
            ) : (
              <Slide borderRadius="4px" />)}
          </div>
        </div>
        <WrapperHomePage style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '1%' }}>
          <hr></hr>
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#eee', width: '100%', gap: '10px', marginTop: '10px' }}>
              <div style={{ width: '100%' }}>
                {loading ? (
                  <Skeleton style={{ padding: 10 }} active={true} />
                ) : (
                  <SmallSlide borderRadius="4px" />
                )}
              </div>
              <SaleProduct></SaleProduct>
            </div>
            <hr></hr>
            <div className="cate-bound" >
              <h3 style={{ margin: '0 10px 10px 10px', color: '#fff', fontWeight: 'bold' }}><MDBIcon fas icon="mobile-alt" /> ĐIỆN THOẠI</h3>
              <ProductHP></ProductHP>
            </div>
            <hr></hr>
            <div className="cate-bound" >
              <h3 style={{ margin: '0 10px 10px 10px', color: '#fff', fontWeight: 'bold' }}><MDBIcon fas icon="suitcase" /> ỐP LƯNG</h3>
              <CaseHP></CaseHP>
            </div>

            <hr></hr>
            <div className="cate-bound" >

              <h3 style={{ margin: '0 10px 10px 10px', color: '#fff', fontWeight: 'bold' }}><MDBIcon fas icon="charging-station" /> CÁP SẠC</h3>
              <ChargerHP></ChargerHP>
            </div>
            <hr></hr>
            <div className="cate-bound" >

              <h3 style={{ margin: '0 10px 10px 10px', color: '#fff', fontWeight: 'bold' }}><MDBIcon fas icon="battery-full" /> PIN DỰ PHÒNG</h3>
              <PinHP></PinHP>
            </div>
            <hr></hr>
            <div className="cate-bound" >
              <h3 style={{ margin: '0 10px 10px 10px', color: '#fff', fontWeight: 'bold' }}><MDBIcon fas icon="headphones" /> TAI NGHE</h3>
              <HeadphoneHP></HeadphoneHP>
            </div>
          </div>
        </WrapperHomePage>
      </WrapperHome>

    </div>

  );
}
export default HomePage;