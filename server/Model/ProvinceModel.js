const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  province: [
    {
      idProvince: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  district: [
    {
      idProvince: {
        type: String,
        required: true
      },
      idDistrict: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  commune: [
    {
      idDistrict: {
        type: String,
        required: true
      },
      idCommune: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

const ProvinceModel = mongoose.model('Province', provinceSchema);

module.exports = ProvinceModel;
