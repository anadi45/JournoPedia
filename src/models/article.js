const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    article_name: {
        type: String
    },
    original_name: {
        type: String
    },
    journal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    },
    date_of_submission: {
        type: Date,
        default: Date.now()
    }, 
    abstract: {
        type: String
    },
    authors: [{
        name: String,
        email: String,
        phone: String,
        institute: String,
        country: String
    }],
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewed_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },   
    peer_choice: [{
        name: String,
        email: String,
        phone: String,
        institute: String,
        country: String
    }],
    status: {
        type: String //Accepted,Rejected,Withdrawn,Under Review
    },
    article_type: {
        type: String //Innovation,Research
    },
    date_of_acceptence: {
        type: Date
    },
    date_of_rejection: {
        type: Date
    },
    date_of_withdrawal: {
        type: Date
    },
    path: {
        type: String
    },
    size: {
        type: Number
    },
    downloads: {
        type: Number,
        default: 0
    }
});

const Article = new mongoose.model("Article",articleSchema);

module.exports = {Article};