const Cart = require('../Model/CartModel');
const ProductVariant = require('../Model/ProductVariantModel');
const Order = require('../Model/OrderModel');
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
    const { userName, userEmail, address,shippingMethod, paymentMethod, subTotal, totalPay, voucher,userPhone } = req.body;
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
const getOrdersWaitingForConfirmation = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Chờ xác nhận' });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng chờ xác nhận:', error);
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
const getOrdersStorePickup = async (req, res) => {
  try {
    const orders = await Order.find({ shippingMethod: 'Nhận tại cửa hàng' });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng nhận tại cửa hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Đã hoàn thành' });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng đã hoàn thành:', error);
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

module.exports = { addOrder,updateOrderStatus,getCompletedOrders,getOrdersByUserId,getOrdersHomeDelivery,getOrdersStorePickup,getOrdersWaitingForConfirmation,cancelOrder };
