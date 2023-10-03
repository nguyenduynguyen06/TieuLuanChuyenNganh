const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  desc: {
    type: String,
    require: true,
  },
  releaseTime: {
    type: Date,
    require: true,
  },
  warrantyPeriod: {
    type: Number,
    require: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
  },
  variant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant', 
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      rating: {
        type: Number,
      },
      comment: String, 
    },
  ],
  isHide: {
    type: Boolean,
    default: false,
  },
  isOutOfStock: {
    type: Boolean,
    default: false,
  },
  properties:   
  {
    type: [String]
  },
  thumnails:
  {
    type: String
  }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
