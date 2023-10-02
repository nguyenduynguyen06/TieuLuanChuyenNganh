const ProductVariant = require('../Model/ProductVariantModel'); 
const Product = require('../Model/ProductModel'); 


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
const deleteProductVariant = async (req, res) => {
  try {
    const productvariantId = req.params.id;
    if (productvariantId) {
      const product = await ProductVariant.findByIdAndDelete({ _id: productvariantId });
      if (!product) {
        return res.status(401).json({ err: 'Sản phẩm không tồn tại' });
      }
      res.status(200).json({ success: true, message: 'Biến thể đã được xóa thành công' });
    } else {
      return res.status(401).json({ msg: 'Không tìm thấy ID' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const updateProductVariant = async (req, res) => {
  try {
    const productVariantId = req.params.id;
    const data = req.body;
    const { parentProductName: newParentProductName } = data;

    const productVariantToUpdate = await ProductVariant.findById(productVariantId);
    if (!productVariantToUpdate) {
      return res.status(404).json({ success: false, error: 'Biến thể không tồn tại' });
    }
    const oldParentProductId = productVariantToUpdate.productName;


    const newParentProduct = await Product.findOne({ name: newParentProductName });
    if (!newParentProduct) {
      return res.status(404).json({ success: false, error: 'Sản phẩm mới không tồn tại' });
    }
    productVariantToUpdate.set(data);
    productVariantToUpdate.productName = newParentProduct._id;
    await productVariantToUpdate.save();
    const oldParentProduct = await Product.findById(oldParentProductId);
    if (oldParentProduct) {
      oldParentProduct.variant = oldParentProduct.variant.filter((variant) => {
        return !variant.equals(productVariantId);
      });
      await oldParentProduct.save();
    }
    newParentProduct.variant.push(productVariantToUpdate._id);
    await newParentProduct.save();

    res.status(200).json({ success: true, data: productVariantToUpdate });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


module.exports = { addProductVariant,deleteProductVariant,updateProductVariant };
