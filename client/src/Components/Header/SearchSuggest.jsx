import { Image } from 'antd';
import React from 'react';

const SearchSuggestion = ({ suggestions, onSuggestionSelected }) => {
  return (
    <ul className="suggestions">
        <li onClick={() => onSuggestionSelected("Product 1")}>
  
          <img
            src="https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1.jpg"
            alt="Product 1"
            style={{ width: '100px', height: '100px' }}
          />
   
        <div className="product-item-details">
          <span className="product-name">Product 1</span>
          <span className="product-price">$800</span>
        </div>
      </li>
      <li >
        <div className="product-item">
          <span className="product-name">Product 1</span>
        </div>
        <div className="product-item">
          <span className="product-name">800$</span>
        </div>
      </li>
      <li >
        <div className="product-item">
          <span className="product-name">Product 1</span>
        </div>
        <div className="product-item">
          <span className="product-name">800$</span>
        </div>
      </li>
    </ul>
  );
};

export default SearchSuggestion;
