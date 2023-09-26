require('dotenv').config();
const express = require('express');
const router = express.Router();

const userAuthenticate = require('../controller/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/Register', userAuthenticate.userRegister);

router.post('/Login', userAuthenticate.userLogin);

router.post('/Logout', userAuthenticate.userLogout);

router.put('/update/:id',  userAuthenticate.userUpdate);
router.delete('/delete/:id', authMiddleware, userAuthenticate.deleteUser);
router.get('/getAll',authMiddleware,userAuthenticate.getAllUser)

router.get('/get-Detail/:id',authUserMiddleware,userAuthenticate.getDetailUser)

router.post('/refresh-token',userAuthenticate.refreshToken)
module.exports = router