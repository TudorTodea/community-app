const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 21
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    description: {
        type: String,
        maxLength: 500,
        default: ''
    },
    members: {
        type: Array
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/992/992615.png?w=740&t=st=1669439350~exp=1669439950~hmac=c79ccbc7dce9868424d736620c4950a0c2c203ff1f1dc3e4f9ecd4ec8065655e'
    },
    banner: {
        type: String,
        default: ''
    },
    mods: {
        type: Array
    }

}, { timestamps: true })

module.exports = mongoose.model("Community", communitySchema)