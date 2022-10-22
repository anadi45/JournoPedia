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
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewed_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },   
    peer_choice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String //Accepted,Rejected,Withdrawn,Under Review
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