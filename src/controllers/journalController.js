const {Journal} = require("../models/journal");

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
            res.send("Journal added successfully!")
        } else {
            res.send("Journal not added!")
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {addJournal};