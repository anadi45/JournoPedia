const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    journal_name: {
        type: String
    },
    original_name: {
        type: String
    },
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewed_by : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date_of_submission: {
        type: Date,
        default: Date.now()
    },
    date_of_approval: {
        type: Date
    },
    topics: [{
        type: String
    }],
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

const Journal = mongoose.model("Journal",journalSchema);

module.exports = {Journal};