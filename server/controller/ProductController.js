const Product = require('../Model/ProductModel');
const Brand = require('../Model/BrandModel');
const Category = require('../Model/CategoryModel');
const ProductVariant = require('../Model/ProductVariantModel')
const addProduct = async (req, res) => {
  try {
    const { name, desc, warrantyPeriod, brandName, categoryName, properties, thumnails } = req.body;

    const brand = await Brand.findOne({ name: brandName });
    if (!brand) {
      return res.status(404).json({ success: false, error: 'Brand không tồn tại' });
    }
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category không tồn tại' });
    }
    const product = new Product({
      name,
      desc,
      releaseTime: Date.now(),
      warrantyPeriod,
      brand: brand._id, 
      category: category._id, 
      isHide: false,
      isOutOfStock: false,
      properties,
      thumnails,
    });
    const newProduct = await product.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProductByBrandId = async (req, res) => {
  try {
    const brandId = req.params.brandId; 
    const products = await Product.find({ brand: brandId });
    return res.status(200).json({
      data: products
    });
  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; 
    const products = await Product.find({ category: categoryId });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const { brandName, categoryName } = data;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }
    const brand = await Brand.findOne({ name: brandName });
    if (!brand) {
      return res.status(404).json({ success: false, error: 'Brand không tồn tại' });
    }
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category không tồn tại' });
    }
    const updateData = {
      ...data,
      brand: brand._id,
      category: category._id,
    };
    const update = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    console.log('update', update);
    res.status(200).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (productId) {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(401).json({ err: 'Sản phẩm không tồn tại' });
      }
      const variants = product.variant;
      for (const variantId of variants) {
        await ProductVariant.findByIdAndDelete(variantId);
      }

      await Product.findByIdAndDelete(productId);

      res.status(200).json({ success: true, message: 'Sản phẩm và các biến thể đã được xóa thành công' });
    } else {
      return res.status(401).json({ msg: 'Không tìm thấy ID' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i'); 
    const products = await Product.find({
      name: { $regex: regex }, 
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};


module.exports = { addProduct,getProductByBrandId,getProductsByCategory,editProduct,deleteProduct,searchProducts };
