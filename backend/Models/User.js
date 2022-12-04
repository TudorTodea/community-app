const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    avatarImage: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
    description: {
        type: String,
        maxLength: 200,
        default: ''
    },
    socialMedia: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        reddit: { type: String, default: '' },

    },


})
userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, 'secret123', { expiresIn: '60min' });
};
module.exports = mongoose.model("Users", userSchema)