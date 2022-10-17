const {Issue} = require("../models/issue");
const {User} = require("../models/user");

//@route    POST /addIssue
//@descr    Add a issue
//@access   Private

const addIssue = async (req,res) => {
    try {
        const {volume} = req.body;
        
        if(!volume) {
            return res.send({
                message: "Volume cannot be empty"
            });
        } 
        if(!req.file) {
            return res.send({
                message: "File cannot be empty"
            });
        } 

        const newIssue = new Issue({
            original_name: req.file.originalname,
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

// ----Change----

//@route    POST /downloadJournal/:journal_id
//@descr    Download Journal by Id
//@access   Public

const downloadJournal = async (req,res) => {
    try {
        const {journal_id} = req.params;
        const findJournal = await Journal.findById(journal_id);
        let downloads = findJournal.downloads;
        
        const update = await Journal.findByIdAndUpdate(journal_id,{downloads: downloads+1});
        if(update) {
            res.download(findJournal.path);
        }

    } catch (error) {
        console.log(error);
    }
}





//@route    DELETE /deleteJournal/:journal_id
//@descr    Delete a journal by Id
//@access   Private

const deleteJournal = async (req,res) => {
    try {
        const {journal_id} = req.params;
        const deleted = await Journal.deleteOne({id: journal_id});

        if(deleted) {
            //Add deletion from server
            res.send({
                message: "Journal deleted succesfully!"
            });
        } else {
            res.send({
                message: "Journal not found!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {addIssue}