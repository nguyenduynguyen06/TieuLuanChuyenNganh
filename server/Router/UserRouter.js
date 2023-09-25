require('dotenv').config();
const express = require('express');
const router = express.Router();

const userAuthenticate = require('../controller/UserController');
const JWTAuthenticate = require('../middleware/checkJWT');
router.post('/Register', userAuthenticate.userRegister);

router.post('/Login', userAuthenticate.userLogin);

router.post('/Logout', JWTAuthenticate.checkJWT, userAuthenticate.userLogout);

router.put('/update/:id',  userAuthenticate.userUpdate);
router.put('/delete/:id',  userAuthenticate.deteleUser);

module.exports = router