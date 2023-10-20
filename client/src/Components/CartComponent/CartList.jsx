import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import axios from 'axios';
function CartList() {
  const user = useSelector((state)=> state.user)
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      render: (product, record) => (
        <div>
          <img src={record.pictures} alt={record.product} style={{ width: '100px', marginRight: '100px' }} />
          <span>{product.name} {record?.memory}</span>
        </div>
      ),
    },
    {
      title: 'Màu',
      dataIndex: 'color',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: price => (
        <span>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(price)}
        </span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (text, record, index) => (
        <div>
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleDecreaseQuantity(index)}>-</Button>
          <Input
            type="number"
            value={quantities[index]|| text}
            style={{ width: '50px' }}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
          />
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleIncreaseQuantity(index)}>+</Button>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'subtotal',
      render: subtotal => (
        <span>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(subtotal)}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${process.env.REACT_APP_API_URL}/cart/getToCart/${user._id}`)
        .then((response) => {
          const cartData = response.data.data;
          setData(cartData);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
        });
    }
  }, [user]);
  const [data,setData] = useState(null);
  const [quantities, setQuantities] = useState(''); 
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };


  const handleIncreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,

  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }


  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={ data }
        scroll={scroll}
      />
    </>
  );
}

export default CartList;
