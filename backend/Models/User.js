const mongoose = require("mongoose");

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
    }

})

module.exports = mongoose.model("Users", userSchema)