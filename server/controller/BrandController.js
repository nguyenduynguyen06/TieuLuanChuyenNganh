const Brand = require('../Model/BrandModel');

const addBrand = async (req, res) => {
  try {
    const { name, picture, country, isHide } = req.body;

    const brand = new Brand({
      name,
      picture,
      country,
      isHide: false,
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
const updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id; 
    const updatedData = req.body; 
    const updatedBrand = await Brand.findByIdAndUpdate(brandId, updatedData);

    if (!updatedBrand) {
      return res.status(404).json({ success: false, error: 'Thương hiệu không tồn tại' });
    }

    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id; 
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ success: false, error: 'Thương hiệu không tồn tại' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addBrand,getAllBrand,updateBrand,deleteBrand };
