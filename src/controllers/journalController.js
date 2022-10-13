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
            res.send("Journal added successfully!")
        } else {
            res.send("Journal not added!")
        }

    } catch (error) {
        console.log(error);
    }
}

//@route    POST /getJournal
//@descr    Get Journal
//@access   Public

const getJournal = async (req,res) => {
    try {
        const {journal_id} = req.body;
        const findJournal = await Journal.findById(journal_id);
        
        res.download(findJournal.path);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {addJournal, getJournal};