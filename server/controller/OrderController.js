const Cart = require('../Model/CartModel');
const ProductVariant = require('../Model/ProductVariantModel');
const Order = require('../Model/OrderModel');
const moment = require("moment-timezone");
const orderSendMail = require('../ultils/oderSendMail');
const generateRandomOrderCode = async () => {
  const prefix = 'GGZ';
  let orderCode;
  let isCodeUnique = false;
  let suffix = 0;
  while (!isCodeUnique) {
    const randomCode = (10000 + suffix).toString();
    orderCode = prefix + randomCode;
    const existingOrder = await Order.findOne({ orderCode });
    if (!existingOrder) {
      isCodeUnique = true;
    } else {
      suffix++;
    }
  }
  return orderCode;
};

const addOrder = async (req, res) => {
  try {
    const orderCode = await generateRandomOrderCode();
    const { userId } = req.params;
    const { userName, userEmail, address, shippingMethod, paymentMethod, subTotal, totalPay, voucher, userPhone } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate('items.productVariant');

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Giỏ hàng không tồn tại hoặc trống' });
    }

    const newOrder = new Order({
      orderCode,
      user: userId,
      items: cart.items,
      userName,
      userEmail,
      address,
      shippingMethod,
      status: 'Chờ xác nhận',
      paymentMethod,
      subTotal,
      shippingFee: 0,
      totalPay,
      voucher,
      userPhone
    });

    for (const cartItem of cart.items) {
      const productVariantId = cartItem.productVariant;
      const productVariant = await ProductVariant.findById(productVariantId);
      if (!productVariant) {
        return res.status(404).json({ success: false, error: 'Sản phẩm biến thể không tồn tại' });
      }

      const matchedAttribute = productVariant.attributes.find(attribute => attribute.color === cartItem.color);
      if (matchedAttribute) {
        const quantityInCart = cartItem.quantity;
        const remainingQuantity = matchedAttribute.quantity - quantityInCart;

        matchedAttribute.quantity = remainingQuantity;
        matchedAttribute.sold += quantityInCart;

        await productVariant.save();
      }
    }

    await Cart.updateOne({ user: userId }, { $set: { items: [] } });
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
    const populatedOrder = await Order.findById(newOrder._id).populate('items.product items.productVariant');
    let emailHTML = `
    <html>
    <head>
        <style>
          body {
              font-family: Arial, sans-serif;
          }
          h2 {
              text-align: center;
          }
          .order-info {
              background-color: #f2f2f2;
              padding: 10px;
              margin: 20px 0;
          }
          h1 {
              
          }
          ul {
              list-style: none;
              padding: 0;
          }
          li {
              margin: 10px 0;
          }
          .product-item {
            display: flex;
            margin-bottom: 20px;
          }
          .product-image {
              max-width: 100px;
              margin-right: 10px;
          }
          table {
              width: 100%;
              border-collapse: collapse;
          }
          table, th, td {
              border: 1px solid #ccc;
          }
          th, td {
              padding: 8px;
              text-align: left;
          }
          th {
              background-color: #f2f2f2;
          }
        </style>
    </head>
    <body>
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="display: flex; align-items: center;">
        <img src="https://res.cloudinary.com/doq4spvys/image/upload/v1698228631/mqjpap63hv6bxuddgfbx.png" style="width: 40px; height: 40px; margin-right: 10px;"/>
        <span style="line-height: 40px; font-size: 17px; font-weight: 600"> Di Động Gen Z</span> 
      </div>
        <p>Di Động Gen Z chân thành cảm ơn sự ủng hộ của bạn, chúc bạn có trải nghiệm mua sắm thật vui vẻ cùng Di Động Gen Z!</p>
        <h2 style="color: #d70018;">Đơn hàng của bạn</h2>
        <div class="order-info">
          <p><strong>Mã đơn hàng:</strong> ${orderCode}</p>
          <p><strong>Tên khách hàng:</strong> ${userName}</p>
          <p><strong>Địa chỉ nhận hàng:</strong> ${address}</p>
          <p><strong>Số điện thoại:</strong> ${userPhone}</p>
          <p><strong>Ngày mua:</strong> ${populatedOrder.createDate}</p>
          <p><strong>Tổng tiền thanh toán:</strong> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPay)}</p>
        </div>
      
`;

    emailHTML += `
        <h2>Sản phẩm</h2>
        <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #000;">Tên sản phẩm</th>
          <th style="border: 1px solid #000;">Hình ảnh</th>
          <th style="border: 1px solid #000;">Số lượng</th>
          <th style="border: 1px solid #000;">Màu sắc</th>
          <th style="border: 1px solid #000;">Đơn giá</th>
          <th style="border: 1px solid #000;">Bảo hành</th>
          <th style="border: 1px solid #000;">Thành tiền</th>
        </tr>
        <!-- Duyệt qua danh sách sản phẩm đã đặt -->
        ${populatedOrder.items.map(item => `
          <tr>
          <td style="border: 1px solid #000; text-align: center;">
          ${item.product.name}  ${item.memory !== undefined ? item.memory : ''}
        </td>        
            <td style="border: 1px solid #000; text-align: center;"><img src="${item.pictures}" alt="Hình ảnh sản phẩm" class="product-image" style="width: 100px; height: 100px;"></td>
            <td style="border: 1px solid #000; text-align: center;">${item.quantity}</td>
            <td style="border: 1px solid #000; text-align: center;">${item.color}</td>
            <td style="border: 1px solid #000; text-align: center;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
            <td style="border: 1px solid #000; text-align: center;">${item.product.warrantyPeriod} tháng</td>
            <td style="border: 1px solid #000; text-align: center;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.subtotal)}</td>
          </tr>
        `).join('')}
      </table>   
      </div>   
          `;

    const data = {
      email: userEmail,
      html: emailHTML,
    };

    await orderSendMail(data);
  } catch (error) {
    console.error('Lỗi khi thêm đơn hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Đơn hàng không tồn tại' });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

   
    const vnTime = moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");


    const updateData = {
      status: 'Đã hoàn thành',
      completeDate: vnTime,
    };

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Đơn hàng không tồn tại' });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOrdersWaitingForConfirmation = async (req, res) => {
  try {
    const orders = await Order.find({ shippingMethod: 'Nhận tại cửa hàng',status: 'Chờ xác nhận' }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng chờ xác nhận:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersShipping = async (req, res) => {
  try {
    const orders = await Order.find({ shippingMethod: 'Giao tận nơi',status: 'Chờ xác nhận' }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng giao tận nơi:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersStorePickupgetReady = async (req, res) => {
  try {
    const orders = await Order.find({
      shippingMethod: 'Nhận tại cửa hàng',
      status:  'Đơn hàng đang được chuẩn bị' 
    }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng nhận tại cửa hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersStorePickupReady = async (req, res) => {
  try {
    const orders = await Order.find({
      shippingMethod: 'Nhận tại cửa hàng',
      status:  'Đơn hàng sẵn sàng' 
    }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng nhận tại cửa hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersStorePickup = async (req, res) => {
  try {
    const orders = await Order.find({ shippingMethod: 'Nhận tại cửa hàng'}).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng chờ xác nhận:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getCompletedOrdersAtStore = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Đã hoàn thành', shippingMethod: 'Nhận tại cửa hàng'}).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng đã hoàn thành:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getCompletedOrdersShipping = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Đã hoàn thành', shippingMethod: 'Giao tận nơi'}).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng đã hoàn thành:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersHomeDelivery = async (req, res) => {
  try {
    const orders = await Order.find({ shippingMethod: 'Giao tận nơi' });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng giao tận nơi:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng của người dùng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Đơn hàng không tồn tại' });
    }
    for (const cartItem of order.items) {
      const productVariantId = cartItem.productVariant;
      const productVariant = await ProductVariant.findById(productVariantId);

      if (productVariant) {
        const matchedAttribute = productVariant.attributes.find(attribute => attribute.color === cartItem.color);

        if (matchedAttribute) {
          const quantityInCart = cartItem.quantity;
          const totalQuantity = matchedAttribute.quantity + quantityInCart;
          const totalSold = matchedAttribute.sold - quantityInCart;

          matchedAttribute.quantity = totalQuantity;
          matchedAttribute.sold = totalSold;

          await productVariant.save();
        }
      }
    }
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ success: true, message: 'Đã hủy đơn hàng' });
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const searchOrder = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const order = await Order.find({orderCode: keyword}).populate('items.product')
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
module.exports = { addOrder, updateOrderStatus, getCompletedOrdersAtStore,getCompletedOrdersShipping,completeOrder, getOrdersByUserId, getOrdersHomeDelivery, getOrdersStorePickupgetReady, getOrdersWaitingForConfirmation, cancelOrder,getOrdersShipping,getOrdersStorePickupReady,getOrdersStorePickup,searchOrder };
