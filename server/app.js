require('dotenv').config();
const express = require('express');
const app = express();
const connect2DB = require('./config/data');
const routerUser = require('./Router/UserRouter');
const routerUpload = require('./Router/UploadRouter')
const routerProduct = require('./Router/ProductRouter')
const routerBrand = require('./Router/BrandRouter')
const routerCart = require('./Router/CartRouter')
const routerComment = require('./Router/CommentRouter')
const bodyParser = require('body-parser');
const routerCategory = require('./Router/CategoryRouter')
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser')
const cors = require('cors');



app.use(cors({
    origin: true, 
    credentials: true, 
  }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routerUpload);
app.use('/user', routerUser);
app.use('/product', routerProduct);
app.use('/category',routerCategory);
app.use('/comment',routerComment);
app.use('/brand',routerBrand)
app.use('/cart',routerCart)
connect2DB();
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server is now running on PORT: ${PORT}`);
})