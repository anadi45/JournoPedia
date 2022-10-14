const {Journal} = require("../models/journal");
const {User} = require("../models/user");

//@route    POST /addJournal
//@descr    Add a journal
//@access   Private

const addJournal = async (req,res) => {
    try {
        const newJournal = new Journal({
            journal_name: req.file.filename,
            original_name: req.file.originalname,
            submitted_by: req.rootuser,
            topics: ["NULL"],
            path: req.file.path,
            size: req.file.size
        });
        const save = await newJournal.save();

        if(save) {
            const id = req.rootuser._id;
            const total_submitted = req.rootuser.total_submitted;
            const update = await User.findByIdAndUpdate(id,{total_submitted: total_submitted+1});
            res.send({
                message: "Journal added successfully!"
            });
        } else {
            res.send({
                message: "Journal not added!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

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

//@route    GET /getAllJournals
//@descr    Get all Journals
//@access   Public

const getAllJournals = async (req,res) => {
    try {
        const allJournals = await Journal.find().sort({date_of_submission: -1});
        res.send(allJournals);

    } catch (error) {
        console.log(error);
    }
}

//@route    GET /viewJournal/:journal_id
//@descr    View a journal by Id
//@access   Public  

const viewJournal = async (req,res) => {
    try {
        const {journal_id} = req.params;
        const journal = await Journal.findById(journal_id);
        
        if(journal) {
            res.send(journal);
        } else {
            res.send({
                message: "Journal not found!"
            });
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

//@route    PATCH /editJournal/:journal_id
//@descr    Edit a journal by Id
//@access   Private

const editJournal = async (req,res) => {
    try {
        const {journal_id} = req.params;
        //After topic array is finalised
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addJournal, downloadJournal, getAllJournals, viewJournal, deleteJournal};