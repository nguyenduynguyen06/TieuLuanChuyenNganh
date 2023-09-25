const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    phone_number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passWord: {
        type: String,
        require: true
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    role_id: {
        type: String,
        require: true
    },
    addRess: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    avatar: {
        type: String
    },
    birthDay:{
        type: String
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;