const { Journal } = require("../models/journal");
const { User } = require("../models/user");

//@route    POST /createJournal
//@descr    Create a journal
//@access   Private

const createJournal = async (req, res) => {
  try {
		if(!req.file) {
			return res.send({
				message: "File cannot be empty"
			});
		} 
		const { journal_name, synopsis, topics_covered } = req.body;
		
		if(!journal_name || !synopsis || !topics_covered) {
			return res.send({
				message: "journal_name or synopsis or topics_covered cannot be empty"
			});
		}
		const newJournal = new Journal({
			journal_name: journal_name,
			synopsis: synopsis,
			topics_covered: topics_covered,
			author: req.rootuser,
			image: req.file.path
		});

		const created = await newJournal.save();
		if (created) {
			res.send({
				message: "Journal created successfully",
			});
		} else {
			res.send({
				message: "Unable to create journal",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

//@route    PATCH /editJournal/:journal_id
//@descr    Edit a journal by Id
//@access   Private

const editJournal = async (req, res) => {
  try {
		const { synopsis, topics_covered } = req.body;
		const { journal_id } = req.params;

		if (!topics_covered) {
			edit = await Journal.findByIdAndUpdate(journal_id, {
				synopsis: synopsis,
			});
		} else if (!synopsis) {
			edit = await Journal.findByIdAndUpdate(journal_id, {
				topics_covered: topics_covered,
			});
		} else {
			edit = await Journal.findByIdAndUpdate(journal_id, {
				synopsis: synopsis,
				topics_covered: topics_covered,
			});
		}

		if (edit) {
			res.send({
				message: "Journal edited successfully",
			});
		} else {
			res.send({
				message: "Unable to edit journal",
			});
		}
	} catch (error) {
			console.log(error);
	}
};

//@route    GET /getAllJournals
//@descr    Get all Journals
//@access   Public

const getAllJournals = async (req, res) => {
	try {
		const allJournals = await Journal.find().sort({ created_on: -1 });
		res.send(allJournals);
	} catch (error) {
		console.log(error);
	}
};

//@route    GET /viewJournal/:journal_id
//@descr    View a journal by Id
//@access   Public

const viewJournal = async (req, res) => {
	try {
		const { journal_id } = req.params;
		const journal = await Journal.findById(journal_id);

		if (journal) {
		res.send(journal);
		} else {
		res.send({
			message: "Journal not found!",
		});
		}
	} catch (error) {
		console.log(error);
	}
};

//@route    PATCH /addAuthors/journal_id
//@descr    Add authors to a journal
//@access   Private

const addEditors = async (req, res) => {
  try {
    const { journal_id } = req.params;
    const { editors } = req.body;

    let editorId = [];
    let oldEditorList = [];
    const journal = await Journal.findById(journal_id);
    if (journal) {
      const editorObj = await User.find({ email: { $in: editors } });
      for (let i = 0; i < editorObj.length; i++) {
        editorId.push(editorObj[i]._id);
      }
      oldEditorList = journal.editors;
    }

    let newEditorList = [...oldEditorList];

    editorId.forEach((id) => {
      if (oldEditorList.includes(id) == false) {
        newEditorList.push(id);
      }
    });

    const add = await Journal.findByIdAndUpdate(journal_id, {
      editors: newEditorList,
    });

    if (add) {
      res.send({
        message: "Editor list updated",
      });
    } else {
      res.send({
        message: "Unable to update editor list",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {createJournal, editJournal, getAllJournals, viewJournal, addEditors};
