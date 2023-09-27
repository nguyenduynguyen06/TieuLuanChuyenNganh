const User = require('../Model/UserModel');
const argon2 = require('argon2');
const { generalAcesstoken, generalRefreshtoken } = require('../middleware/JWT');
const JWT = require('../middleware/JWT')

const userRegister = async (req, res) => {
    const hashPass = await argon2.hash(req.body.passWord);
    User.create({
        fullName: req.body.fullName,
        phone_number: req.body.phone_number,
        email : req.body.email,
        passWord: hashPass,
        googleId: req.body.googleId,
        facebookId: req.body.facebookId,
        role_id: 2,
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
                
                
                const tokenData = refresh_Token
                res.cookie('refresh_token', tokenData, { httpOnly: true, secure:true, samesite: 'strict',expires: new Date(Date.now() + 8600000000) });
                return res.status(200).json({
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
              await User.findByIdAndUpdate(userId, data, { new: true });
        } else {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const checkUser = await User.findOne({ _id: userId });
            if (checkUser) {
                 await User.findByIdAndDelete(userId);
             
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
const getAllUser = async (req, res) => {
    try {
        const data = await User.find();
        return res.status(200).json({
            data: data
        });
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};
const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const data = await User.findOne({ _id: userId });
            if (data) {
                return res.status(200).json({ data: data });
            } else {
                return res.status(500).json({ err: 'Không tồn tại User' });
            }
        } else {
            return res.status(400).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
        
        const result = await JWT.refreshTokenJWT(token); // Gọi refreshTokenJWT và lưu kết quả vào biến result
        if (result.status === 'error') {
            return res.status(401).json({ msg: 'Lỗi khi làm mới token' });
        }
      res.status(200).json({ access_Token: result.access_Token });
    } catch (error) {
        console.error('Lỗi Server:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};


const userLogout = (req, res) => {
    res.clearCookie('refresh_token', { httpOnly: true }); 
    return res.status(200).json({ msg: 'Good bye!' });
  };



module.exports = { userRegister, userLogin, userLogout , userUpdate, deleteUser,getAllUser,refreshToken,getDetailUser};