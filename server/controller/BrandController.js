const Brand = require('../Model/BrandModel');

const addBrand = async (req, res) => {
  try {
    const { name, picture, country, isHide } = req.body;

    const brand = new Brand({
      name,
      picture,
      country,
      isHide: isHide
    });

    const newBrand = await brand.save();

    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllBrand = async (req, res) => {
    try {
        const data = await Brand.find();
        return res.status(200).json({
            data: data
        });
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};
module.exports = { addBrand,getAllBrand };
