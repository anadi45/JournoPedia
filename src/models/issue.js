const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    original_name: {
        type: String
    },
    number: {
        type: Number
    },
    volume: {
        type: Number
    },
    date_of_submission: {
        type: Date,
        default: Date.now()
    }, 
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewed_by : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],   
    date_of_approval: {
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

const Issue = new mongoose.model("Issue",issueSchema);

module.exports = {Issue};