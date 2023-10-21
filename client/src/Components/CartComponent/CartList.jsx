import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import axios from 'axios';
function CartList() {
  const user = useSelector((state)=> state.user)
  const [modalDelete,setModalDelete] = useState(false);
  const [currentCartId,setCurrentCartId] = useState(null);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      render: (product, record) => (
        <div>
          <img src={record.pictures} alt={record.product} style={{ width: '100px', marginRight: '100px' }} />
          <span style={{fontSize:"15px"}}>{product.name} - {record?.memory}</span>
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
        <span style={{fontSize:'17px', fontWeight:'bold'}}>
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
      render: (text, record, index) => {
        return(
        <div>
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleDecreaseQuantity(index)}>-</Button>
          <Input
            value={quantities[index]}
            style={{ width: '50px',fontWeight: 'bold'}}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
          />
          <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '0px' }} onClick={() => handleIncreaseQuantity(index)}>+</Button>
        </div>
        )
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'subtotal',
      render: subtotal => (
        <span style={{fontSize:'17px', fontWeight:'bold', color:'#FF3300'}}>
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
          render: (record) => {
            return (
              <div>
            <a onClick={() => {setModalDelete(true); setCurrentCartId(record._id)}}> <DeleteOutlined/></a> 
            <Modal
          title="Xoá giỏ hàng"
          visible={modalDelete}
          onOk={() => {
            handleDeleteCartItem(currentCartId);
            setModalDelete(false); 
          }}
          onCancel={() => setModalDelete(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá sản phâm {record.name} này khỏi giỏ hàng?</p>
        </Modal>
              </div>
            );
          },
    },
  ];
  const handleDeleteCartItem = (cartItemId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/cart/deleteCart/${cartItemId}/${user._id}`)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error('Lỗi khi xóa mục giỏ hàng:', error);
      });
  };
  useEffect(() => {
    if (user && user._id) {
      axios.get(`${process.env.REACT_APP_API_URL}/cart/getToCart/${user._id}`)
        .then((response) => {
          const cartData = response.data.data;
          setData(cartData);
          const initialQuantities = cartData.map((item) => item.quantity);
          setQuantities(initialQuantities);
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
    axios.put(`${process.env.REACT_APP_API_URL}/cart/update/${data[index]._id}/${user._id}`, { quantity: value })
    .then((response) => {
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
    })
    .catch((error) => {
      console.error('Lỗi khi cập nhật số lượng:', error);
    });
  };


  const handleIncreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] < 3) {
    updatedQuantities[index] += 1;
    }
    setQuantities(updatedQuantities);
    axios.put(`${process.env.REACT_APP_API_URL}/cart/update/${data[index]._id}/${user._id}`, { quantity: updatedQuantities[index] })
    .then((response) => {
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
    })
    .catch((error) => {
      console.error('Lỗi khi cập nhật số lượng:', error);
    });
  };

  const handleDecreaseQuantity = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
      axios.put(`${process.env.REACT_APP_API_URL}/cart/update/${data[index]._id}/${user._id}`, { quantity: updatedQuantities[index] })
      .then((response) => {
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
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật số lượng:', error);
      });
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
