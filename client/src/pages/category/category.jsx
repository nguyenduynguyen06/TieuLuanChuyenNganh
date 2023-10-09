import React,{useState,useEffect} from 'react'
import { Card } from 'antd';
import { CardWrapper } from './style';
import axios from 'axios';

const gridStyle = {
  width: '20%',
  textAlign: 'center',
  fontSize: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundImage: 'linear-gradient(to right, #8c52ff,  #ff3300)',
  borderRadius: '5px'

};
const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        setCategories(response.data.data);
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
    <CardWrapper title={<span style={{ fontSize: '24px', color: '#FF3300' }} >Danh mục</span>}>
      {categories.map((category) => (
        <Card.Grid
          key={category._id}
          style={{ ...gridStyle, cursor: 'pointer' }}
          onClick={() => handleCardClick(category.name)}
        >
          <img src={category.image} className='img-fluid rounded' alt='' />
          <p>{category.name}</p>
        </Card.Grid>
      ))}
    </CardWrapper>
  )
}

export default Category