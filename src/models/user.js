const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    total_submitted: {
        type: Number,
        default: 0
    },
    total_accepted: {
        type: Number,
        default: 0
    },
    total_rejected: {
        type: Number,
        default: 0
    },
    userRole: {
        type: String
    },
    score: {
        type: Number
    },
    preferences: [{
        type: String
    }],
    expertise: [{
        type: String
    }]
});

const User = mongoose.model("User",userSchema);

module.exports = {User};