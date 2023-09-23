const User = require('../model/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const vnTime = moment.tz('Asia/Ho_Chi_Minh');
const currentTimeInVN = vnTime.format('YYYY-MM-DD');
const userRegister = async (req, res) => {
    const hashPass = await argon2.hash(req.body.passWord);
    User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phone_number: req.body.phone_number,
        addRess: req.body.addRess,
        passWord: hashPass,
        role_id: 2,
        creat_at: currentTimeInVN,
        status: 1,
        avatar: req.body.avatar
    })
        .then(user => res.status(200).json({ msg: 'thành công' }))
        .catch(err => res.status(400).json({msg : 'thất bại'}))
};

const userLogin = async (req, res) => {
    const password = req.body.passWord;
    try {
        const userFound = await User.findOne({ email: req.body.email })
        if (userFound) {
            const validPassword = await argon2.verify(userFound.passWord, password);
            if (validPassword) {
                const data_in = jwt.sign({
                    fullName: userFound.fullName,
                    email: userFound.email,
                    phone_number: userFound.phone_number,
                    addRess: userFound.addRess,
                    role_id: userFound.role_id,
                    status: userFound.status,
                    avatar: userFound.avatar
                }, process.env.JWT_KEY);
                res.cookie('token', data_in, {
                    httpOnly: true, expires: new Date(Date.now() + 864000)
                })
                return res.status(200).json({ fullName: userFound.fullName, email: userFound.email, phone_number: userFound.phone_number, addRess: userFound.addRess,role_id: userFound.role_id,
                    status: userFound.status,avatar: userFound.avatar });
            } else {
                return res.status(404).json({ err: 'Username/Password not match!' });
            }
        } else {
            return res.status(404).json({ err: 'Username/Password not match!' });
        }
    } catch {
        return res.status(500).json({ err: 'Something went wrong' });
    }
};

const userLogout = (req, res) => {
    res.clearCookie('token', { httpOnly: true }); 
    return res.status(200).json({ msg: 'Good bye!' });
  };



module.exports = { userRegister, userLogin, userLogout };