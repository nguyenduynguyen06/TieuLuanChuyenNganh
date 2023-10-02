const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
  },
  country: {
    type: String,
  },
  isHide: {
    type: Boolean,
    default: false,
  },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
