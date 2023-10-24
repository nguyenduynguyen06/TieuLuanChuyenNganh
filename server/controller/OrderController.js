const Cart = require('../Model/CartModel');
const ProductVariant = require('../Model/ProductVariantModel');
const Order = require('../Model/OrderModel');

const addOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, userEmail, address,shippingMethod, paymentMethod, subTotal, totalPay, voucher } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate('items.productVariant');
    
    if (!cart) {
      return res.status(404).json({ success: false, error: 'Giỏ hàng không tồn tại' });
    }

    const newOrder = new Order({
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
    
    await Cart.findOneAndDelete({ user: userId });
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.error('Lỗi khi thêm đơn hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addOrder };
