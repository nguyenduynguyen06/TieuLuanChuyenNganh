const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const mongoose = require('mongoose');
const Category = require('../../Model/CategoryModel');
const Brand = require('../../Model/BrandModel');
const Product = require('../../Model/ProductModel');
const User = require('../../Model/UserModel');
const ProductVariant = require('../../Model/ProductVariantModel');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const dotenv = require('dotenv');
dotenv.config();
chai.use(chaiHttp);

describe('Lấy Sản Phẩm Theo Danh Mục', function () {
  let authToken;
  let categoryId;
  let brandId;
  let productId;

  before(async function () {
    await mongoose.connect(`mongodb+srv://didonggenz:1234567890@cluster1.xpc7x0j.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = new User({
        fullName: 'Nguyen Duy Nguyen',
        phone_number: '123456789',
        email: 'nguyennguyen311232132132132112321@example.com',
        passWord: 'hashedPassword',
        role_id: 1,
        addRess: '123 Thu Duc',
        isBlocked: false,
    });
    await user.save();

    authToken = jwt.sign({ id: user._id, role_id: user.role_id }, process.env.ACCESS_TOKEN);

    const category = new Category({ name: 'TestCategory' });
    await category.save();
    if (!category._id) {
      throw new Error('Failed to create category');
    }
    categoryId = category._id;

    const brand = new Brand({ name: 'TestBrand' });
    await brand.save();
    brandId = brand._id;
   
    const productData = {
      name: 'TestProduct',
      desc: 'Test product description',
      releaseTime: new Date(),
      warrantyPeriod: 12,
      brand: brandId,
      category: categoryId,
      isHide: false,
      isOutOfStock: false,
      properties: { color: 'red', size: 'medium' },
      thumnails: ['thumbnail1.jpg', 'thumbnail2.jpg'],
      include: 'Test',
    };
    const response = await chai
      .request(app)
      .post('/api/product/addProduct')
      .set('token', `Bearer ${authToken}`)
      .send(productData);
    productId = response.body.data._id;
  });

  after(async function () {
  
    await Category.deleteOne({ _id: categoryId });
    await Brand.deleteOne({ _id: brandId });
    await Product.deleteOne({ _id: productId });
    await mongoose.connection.close();
  });

  it('Lấy danh sách sản phẩm theo danh mục thành công', async function () {
    const response = await chai
      .request(app)
      .get(`/api/product/getIdByCategory/${categoryId}`);
    
      console.log('CategoryId:', categoryId)
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('success').to.equal(true);
    expect(response.body).to.have.property('data').to.be.an('array');
    expect(response.body.data).to.have.lengthOf.at.least(1);
  });
});
