require('dotenv').config();
const express = require('express');
const router = express.Router();

const userAuthenticate = require('../controller/user');
const JWTAuthenticate = require('../middleware/checkJWT');
router.post('/Register', userAuthenticate.userRegister);

router.post('/Login', userAuthenticate.userLogin);

router.post('/Logout', JWTAuthenticate.checkJWT, userAuthenticate.userLogout);


module.exports = router