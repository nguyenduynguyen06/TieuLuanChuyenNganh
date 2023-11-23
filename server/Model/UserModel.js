const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    role_id: {
        type: Number,
        required: true
    },
    addRess: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String
    },
    birthDay:{
        type: String
    }
}, { validateBeforeSave: true });
const User = mongoose.model('User', UserSchema);

module.exports = User;

