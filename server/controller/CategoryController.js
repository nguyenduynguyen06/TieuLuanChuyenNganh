const Category = require('../Model/CategoryModel');

// Controller để thêm danh mục sản phẩm
const addCategory = async (req, res) => {
  try {
    const { name, picture } = req.body;

    const category = new Category({
      name,
      picture
    });

    const newCategory = await category.save();

    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addCategory };
