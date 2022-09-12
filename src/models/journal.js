const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
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
    }]
});

const Journal = mongoose.model("Journal",journalSchema);

module.exports = {Journal};