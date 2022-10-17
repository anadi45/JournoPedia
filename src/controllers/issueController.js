const {Issue} = require("../models/issue");
const {User} = require("../models/user");
const fs = require("fs");

//@route    POST /addIssue
//@descr    Add a issue
//@access   Private

const addIssue = async (req,res) => {
    try {
        const {volume,journal_id} = req.body;
        
        if(!volume || !journal_id) {
            return res.send({
                message: "Volume or journal_id cannot be empty"
            });
        } 
        if(!req.file) {
            return res.send({
                message: "File cannot be empty"
            });
        } 

        const newIssue = new Issue({
            original_name: req.file.originalname,
            journal: journal_id,
            submitted_by: req.rootuser,
            volume: volume,
            path: req.file.path,
            size: req.file.size
        });
        const save = await newIssue.save();

        if(save) {
            const id = req.rootuser._id;
            const total_submitted = req.rootuser.total_submitted;
            const update = await User.findByIdAndUpdate(id,{total_submitted: total_submitted+1});
            res.send({
                message: "Issue added successfully!"
            });
        } else {
            console.log(req.file.path);
            res.send({
                message: "Issue not added!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

//@route    GET /downloadIssue/:issue_id
//@descr    Download Issue by Id
//@access   Public

const downloadIssue = async (req,res) => {
    try {
        const {issue_id} = req.params;
        const findIssue = await Issue.findById(issue_id);
        let downloads = findIssue.downloads;

        const update = await Issue.findByIdAndUpdate(issue_id,{downloads: downloads+1});
        if(update) {
            res.download(findIssue.path);
        }
        
    } catch (error) {
        console.log(error);
    }
}

//@route    DELETE /deleteIssue/:issue_id
//@descr    Delete a issue by Id
//@access   Private

const deleteIssue = async (req,res) => {
    try {
        const {issue_id} = req.params;
        const deleted = await Issue.deleteOne({id: issue_id});

        if(deleted) {
            //Add deletion from server
            res.send({
                message: "Issue deleted succesfully!"
            });
        } else {
            res.send({
                message: "Issue not found!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {addIssue, downloadIssue, deleteIssue};