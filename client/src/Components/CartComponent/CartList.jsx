// src/CartComponent/CartList.js
import React, { useState , useEffect} from 'react';
import CartItem from './CartHeader';

function CartList() {
    const [cart, setCart] = useState([]);
    // Hàm để lưu giỏ hàng vào localStorage
    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Hàm để thêm sản phẩm vào giỏ hàng

      
      // Hàm để thêm sản phẩm vào giỏ hàng
      const addToCart = (product) => {
        setCart([...cart, product]);
        saveCartToLocalStorage([...cart, product]); // Lưu giỏ hàng vào localStorage
      };
      
      // Hàm để xóa sản phẩm khỏi giỏ hàng
      const removeFromCart = (product) => {
        const updatedCart = cart.filter((item) => item !== product);
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart); // Lưu giỏ hàng vào localStorage
      }
      
    const getCartFromLocalStorage = () => {
        const cartData = localStorage.getItem('cart');
        return JSON.parse(cartData) || [];
    }

    // Khởi tạo giỏ hàng từ dữ liệu trong localStorage khi tải trang
    useEffect(() => {
        const savedCart = getCartFromLocalStorage();
        setCart(savedCart);
    }, []); 
     return (
    <div className="cart-list">
      {cart.length > 0 ? (
        cart.map((product, index) => (
          <CartItem key={index} product={product} removeFromCart={removeFromCart} />
        ))
      ) : (
        <p>Giỏ hàng trống.</p>
      )}
    </div>
  );
}

export default CartList;
