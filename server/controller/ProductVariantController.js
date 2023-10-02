const ProductVariant = require('../Model/ProductVariantModel'); 
const Product = require('../Model/ProductModel'); 

// Controller để thêm Product Variant
const addProductVariant = async (req, res) => {
  try {
    const { parentProductName ,sku, color, memory, imPrice, price, quantity, pictures } = req.body;
    const parentProduct = await Product.findOne({ name: parentProductName });
    if (!parentProduct) {
      return res.status(404).json({ success: false, error: 'Sản phẩm cha không tồn tại' });
    }

    const productVariant = new ProductVariant({
      productName: parentProduct._id, 
      sku,
      color,
      memory,
      imPrice,
      price,
      quantity,
      pictures,
    });

    const newProductVariant = await productVariant.save();
    parentProduct.variant.push(newProductVariant._id);
    await parentProduct.save();

    res.status(201).json({ success: true, data: newProductVariant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export controller để sử dụng trong routes
module.exports = { addProductVariant };
