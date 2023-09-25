const User = require('../Model/UserModel');
const argon2 = require('argon2');
const { generalAcesstoken, generalRefreshtoken } = require('../middleware/JWT');


const userRegister = async (req, res) => {
    const hashPass = await argon2.hash(req.body.passWord);
    User.create({
        fullName: req.body.fullName,
        phone_number: req.body.phone_number,
        email : req.body.email,
        passWord: hashPass,
        googleId: req.body.googleId,
        facebookId: req.body.facebookId,
        role_id: 1,
        addRess: req.body.addRess,
        status: 1,
        avatar: req.body.avatar,
        birthDay: req.body.birthDay
    })
        .then(user => res.status(200).json({ msg: 'thành công' }))
        .catch(err => res.status(400).json({msg : 'thất bại'}))
};

const userLogin = async (req, res) => {
    const password = req.body.passWord;
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
            const validPassword = await argon2.verify(userFound.passWord, password);
            if (validPassword) {
                const access_Token = await generalAcesstoken({
                    id: userFound._id,
                    fullName: userFound.fullName,
                    phone_number: userFound.phone_number,
                    email: userFound.email,
                    addRess: userFound.addRess,
                    avatar: userFound.avatar,
                    birthDay: userFound.birthDay,
                    role_id: userFound.role_id
                });
                const refresh_Token = await generalRefreshtoken({
                    id: userFound._id,
                    fullName: userFound.fullName,
                    phone_number: userFound.phone_number,
                    email: userFound.email,
                    addRess: userFound.addRess,
                    avatar: userFound.avatar,
                    birthDay: userFound.birthDay,
                    role_id: userFound.role_id
                });
                return res.status(200).json({
                    fullName: userFound.fullName,
                    role_id: userFound.role_id,

                    access_Token,
                    refresh_Token
                });
            } else {
                return res.status(401).json({ err: 'Username/Password not match!' });
            }
        } else {
            return res.status(401).json({ err: 'Username/Password not match!' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ err: 'Something went wrong' });
    }
};
const userUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (userId) {
            const checkUser = await User.findOne({ _id: userId });
            if (checkUser) {
                const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
                return res.status(200).json(updatedUser);
            } else {
                return res.status(401).json({ err: 'Không tồn tại User' });
            }
        } else {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};
const deteleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const checkUser = await User.findOne({ _id: userId });
            if (checkUser) {
                const deletedUser = await User.findByIdAndDelete(userId);
                return res.status(200).json(deletedUser);
            } else {
                return res.status(401).json({ err: 'Không tồn tại User' });
            }
        } else {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};

const userLogout = (req, res) => {
    res.clearCookie('token', { httpOnly: true }); 
    return res.status(200).json({ msg: 'Good bye!' });
  };



module.exports = { userRegister, userLogin, userLogout , userUpdate, deteleUser};