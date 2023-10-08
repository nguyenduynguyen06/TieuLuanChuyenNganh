const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
  },
  sku: {
    type: String,
    require: true,
    unique: true
  },
  color:{
    type: String,
  },
  memory:{
    type: String,
  },
  imPrice: {
    type: Number,
    require: true,
  },
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  pictures: [{
    type: String,
  }],
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports = ProductVariant;
