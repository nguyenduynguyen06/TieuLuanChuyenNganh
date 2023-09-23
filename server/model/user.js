const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone_number: {
        type: Number,
        require: true
    },
    addRess: {
        type: String,
        require: true
    },
    passWord: {
        type: String,
        require: true
    },
    role_id: {
        type: String,
        require: true
    },
    creat_at: {
        type: Date,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    avatar: {
        type: String,
        require: false
    },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;