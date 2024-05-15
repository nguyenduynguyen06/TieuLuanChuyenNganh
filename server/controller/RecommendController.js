const UserAccess = require('../Model/RecommendModel');
const Cart = require('../Model/CartModel');
const Product = require('../Model/ProductModel')
const saveUserAccess = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
        return res.status(400).json({ success: false, error: 'Thiếu thông tin userId hoặc productId' });
      }
      const userAccess = new UserAccess({
        user: userId,
        product: productId
      });
      const data = await userAccess.save();
      res.status(201).json({ success: true, message: data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };  
  const calculateSimilarityScore = (product1, product2) => {
    let similarityScore = 0;

  
    if (product1.category.toString() === product2.category.toString()) {
        similarityScore += 1;
    }

    if (product1.brand.toString() === product2.brand.toString()) {
        similarityScore += 1;
    }


    const priceDifference = Math.abs(product1.variant[0].newPrice - product2.variant[0].newPrice);
    const maxPriceDifference = Math.max(product1.variant[0].newPrice, product2.variant[0].newPrice);
    const priceSimilarity = 1 - priceDifference / maxPriceDifference;
    similarityScore += priceSimilarity;

 
    if (product1.variant[0].memory && product2.variant[0].memory) {
        if (product1.variant[0].memory === product2.variant[0].memory) {
            similarityScore += 1;
        }
    }

    return similarityScore;
};

const generateRecommendations = (products, limit) => {
    const similarities = [];


    for (let i = 0; i < products.length; i++) {
        for (let j = i + 1; j < products.length; j++) {
            const similarityScore = calculateSimilarityScore(products[i], products[j]);
            similarities.push({ product1: products[i], product2: products[j], score: similarityScore });
        }
    }


    similarities.sort((a, b) => b.score - a.score);

  
    const recommendations = similarities.slice(0, limit).map(similarity => similarity.product2);
    return recommendations;
};

const generateProductRecommendations = async (req, res) => {
    try {
        const { userId, limit } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, error: 'Thiếu thông tin userId' });
        }

 
        const userAccessHistory = await UserAccess.find({ user: userId }).sort({ timestamp: -1 }).limit(10);
        const productIdsFromHistory = userAccessHistory.map(access => access.product);
      
        const userCart = await Cart.findOne({ user: userId }).populate({
            path: 'items',
            populate: { path: 'product' }
        });
        const productIdsFromCart = userCart.items.map(item => item.product._id);


        const allProductIds = [...new Set([...productIdsFromHistory, ...productIdsFromCart])];
        const products = await Product.find({ _id: { $in: allProductIds } }).populate('variant');

     
        const recommendations = generateRecommendations(products, limit || 5);
        res.status(200).json({ success: true, data: recommendations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

  
module.exports = {saveUserAccess, generateProductRecommendations};
