const Banner = require('../Model/BannerModel')

const addBanner = async (req, res) => {
    try {
        const { title, image, link, startDate, endDate } = req.body;

        const banner = new Banner({
            title,
            image,
            link,
            startDate,
            endDate,
            isActive: false,
        });

        const newBanner = await banner.save();
        res.status(201).json({ success: true, data: newBanner });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const editBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image, link, startDate, endDate, isActive } = req.body;

        const updatedBanner = await Banner.findByIdAndUpdate(id, {
            title,
            image,
            link,
            startDate,
            endDate,
            isActive,
        }, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy banner' });
        }

        res.status(200).json({ success: true, data: updatedBanner });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBanner = await Banner.findByIdAndDelete(id);

        if (!deletedBanner) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy banner' });
        }

        res.status(200).json({ success: true, data: deletedBanner });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const getAllBanners = async (req, res) => {
    try {
      const banners = await Banner.find();
  
      res.status(200).json({ success: true, data: banners });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
module.exports = { addBanner, editBanner, deleteBanner,getAllBanners }