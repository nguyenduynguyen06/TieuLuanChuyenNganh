const Product = require('../Model/ProductModel');
const Brand = require('../Model/BrandModel');
const Category = require('../Model/CategoryModel');
const ProductVariant = require('../Model/ProductVariantModel');
const { format } = require('date-fns');
const addProduct = async (req, res) => {
  let variantsAddedSuccessfully = true;
  let newProduct;

  try {
    const { name, desc, warrantyPeriod, brandName, categoryName, properties, thumnails, include, variants } = req.body;
    const releaseTimeInput = req.body.releaseTime;
    const formattedReleaseTime = format(new Date(releaseTimeInput), 'dd/MM/yyyy');
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
      releaseTime: formattedReleaseTime,
      warrantyPeriod,
      brand: brand._id,
      category: category._id,
      isHide: true,
      isOutOfStock: false,
      properties,
      thumnails,
      include
    });
    newProduct = await product.save();

    for (const variantData of variants) {
      const { memory, imPrice, oldPrice, newPrice, attributes } = variantData;
      const duplicateSku = await ProductVariant.findOne({ "attributes.sku": { $in: attributes.map(attr => attr.sku) } });
      if (duplicateSku) {
        await Product.deleteOne({ _id: newProduct._id });
        return res.status(400).json({ success: false, error: 'Thuộc tính SKU đã tồn tại' });
      }

      const productVariant = new ProductVariant({
        productName: newProduct._id,
        memory,
        imPrice,
        oldPrice,
        newPrice,
        attributes,
      });
      const newProductVariant = await productVariant.save();
      newProduct.variant.push(newProductVariant._id);
    }

    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    variantsAddedSuccessfully = false; 
    if (newProduct) {
      await Product.deleteOne({ _id: newProduct._id });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};






const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; 

    
    const skip = (page - 1) * pageSize;

    const totalProducts = await Product.countDocuments({ category: categoryId });

    
    const products = await Product.find({ category: categoryId })
      .select('-desc  -views -include -promotion ')
      .populate('brand')
      .populate({
        path: 'variant',
        populate: {
          path: 'attributes',
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    res.status(200).json({
      success: true,
      data: products,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / pageSize),
        totalProducts: totalProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};




const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const updateData = {};
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.desc) {
      updateData.desc = data.desc;
    }
    if (data.releaseTime) {
      const releaseTimeInput = data.releaseTime;
      const formattedReleaseTime = format(new Date(releaseTimeInput), 'dd/MM/yyyy');
      updateData.releaseTime = formattedReleaseTime;
    }
    if (data.warrantyPeriod) {
      updateData.warrantyPeriod = data.warrantyPeriod;
    }
    if (data.brandName) {
      const brand = await Brand.findOne({ name: data.brandName });
      if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand không tồn tại' });
      }
      updateData.brand = brand._id;
    }
    if (data.categoryName) {
      const category = await Category.findOne({ name: data.categoryName });
      if (!category) {
        return res.status(404).json({ success: false, error: 'Category không tồn tại' });
      }
      updateData.category = category._id;
    }
    if (data.variant) {
      updateData.variant = data.variant;
    }
    if (data.ratings) {
      updateData.ratings = data.ratings;
    }
    if (data.include) {
      updateData.include = data.include;
    }
    if (data.isHide !== undefined) {
      updateData.isHide = data.isHide;
    }
    if (data.properties) {
      updateData.properties = data.properties;
    }
    if (data.thumnails) {
      updateData.thumnails = data.thumnails;
    }
    if (data.promotion) {
      updateData.promotion = data.promotion;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true })
      .populate('brand')
      .populate({
        path: 'variant',
        populate: {
          path: 'attributes',
        },
      })
      .lean();
      
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error });
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
const searchProductAdmin = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');

    const products = await Product.find({
      name: { $regex: regex },
      isHide: false
    })
    .select('-desc -views -include -promotion')
    .populate('brand')
    .populate({
      path: 'variant',
      populate: {
        path: 'attributes',
      },
    })
    .lean();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};

const detailsProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.findOne({ name })
      .populate('brand')
      .populate('category')
      .populate({
        path: 'variant',
        populate: {
          path: 'attributes',
        },
      }).lean();
    if (!products) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const IdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findOne({ _id: id })
      .populate('brand')
      .populate('category')
      .populate({
        path: 'variant',
        populate: {
          path: 'attributes',
        },
      }).lean();
    if (!products) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .select('_id') 
      .exec();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const getProductRating = async (req, res) => {
  try {
    const productName = req.params.productName;
    const product = await Product.findOne({ name: productName }).populate({
      path: 'ratings',
      populate: { path: 'user' }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }

    const rating = product.ratings;

    const starFilter = parseInt(req.query.star);
    const hasPicturesFilter = req.query.hasPictures;

    if (!isNaN(starFilter) && starFilter >= 1 && starFilter <= 5) {
      const rating1 = rating.filter((review) => review.rating === starFilter);
      if (hasPicturesFilter === 'true') {
        const rating2 = rating1.filter((review) => review.pictures.length > 0);
        return res.status(200).json({ success: true, data: rating2 });
      } else {
        return res.status(200).json({ success: true, data: rating1 });
      }
    }

    if (hasPicturesFilter === 'true') {
      const rating1 = rating.filter((review) => review.pictures.length > 0);
      return res.status(200).json({ success: true, data: rating1 });
    }

    if (!starFilter && hasPicturesFilter === 'false') {
      return res.status(200).json({ success: true, data: rating });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const getAllProductsWithTotalSold = async (req, res) => {
  try {
    const products = await Product.find().populate('variant');
    
    const productList = products.map((product) => {
      const totalSold = product.variant.reduce((total, variant) => {
        return total + variant.attributes.reduce((attrTotal, attr) => {
          return attrTotal + attr.sold;
        }, 0);
      }, 0);

      return {
        productId: product._id,
        productName: product.name,
        totalSold: totalSold,
      };
    });

    res.status(200).json({ success: true, data: productList });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm và tổng số lượng đã bán:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {searchProductAdmin,IdProduct,getAllProductsWithTotalSold, addProduct, getProductRating, getProductsByCategory, editProduct, deleteProduct, getAllProduct, detailsProduct };
