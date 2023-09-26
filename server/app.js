require('dotenv').config();
const express = require('express');
const app = express();
const connect2DB = require('./config/data');
const routerUser = require('./Router/UserRouter');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser')
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/user', routerUser);
connect2DB();
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server is now running on PORT: ${PORT}`);
})