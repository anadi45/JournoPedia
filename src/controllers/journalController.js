const { Journal } = require("../models/journal");
const { User } = require("../models/user");
const fs = require("fs");

//@route    POST /createJournal
//@descr    Create a journal
//@access   Admin

const createJournal = async (req, res) => {
  try {
		if(!req.file) {
			return res.send({
				message: "File cannot be empty"
			});
		} 
		const { journal_name, synopsis } = req.body;
		
		if(!journal_name || !synopsis) {
			return res.send({
				message: "journal_name or synopsis cannot be empty"
			});
		}
		const newJournal = new Journal({
			journal_name: journal_name,
			synopsis: synopsis,
			// topics_covered: topics_covered,
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

//@route	GET /getAllJournalIds
//@descr	Get all journal ids
//@access	Public

const getAllJournalIds = async (req,res) => {
	try {
		const allJournals = await Journal.find();
		let ids = [];
		
		for(let i=0;i<allJournals.length;i++) {
			ids.push(allJournals[i]._id);
		}

		return res.send(ids);
	} catch (error) {
		console.log(error);
	}
}

//@route    GET /viewJournal/:journal_id
//@descr    View a journal by Id
//@access   Public

const viewJournal = async (req, res) => {
	try {
		const { journal_id } = req.params;
		const journal = await Journal.findById(journal_id);
		
		const author_id = journal.author;
		const author = await User.findById(author_id);
		
		if (journal && author) {
			res.send({journal,author});
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

//@route	PATCH /removeEditors/journal_id
//@descr	Remove editors from journal
//@access	Admin

const removeEditors = async (req,res) => {
	try {
		const {journal_id} = req.params;
		const {editors} = req.body;
		console.log(editors)
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
		console.log(editorId)
		console.log(oldEditorList)
		return;
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
}

//@route	PATCH /changeAuthor/journal_id
//@descr	Change author/editor-in-chief
//@access	Admin

const changeAuthor = async (req,res) => {
	try {
		const {journal_id} = req.params;
		const {email} = req.body;

		const author = await User.find({email: email});
		if(author) {
			const change = await Journal.findByIdAndUpdate(journal_id,{author: author[0]._id});
			if(change) {
				return res.send({
					message: "Author changed"
				});
			} else {
				return res.send({
					message: "Author not changed"
				});
			}
		} else {
			return res.send({
				message: "User not found"
			});
		}
	} catch (error) {
		console.log(error);		
	}
}

//@route	DELETE	/deleteJournal/journal_id
//@descr	Delete a journal
//@access	Admin

const deleteJournal = async (req,res) => {
	try {
		const {journal_id} = req.params;

		const journal = await Journal.findById(journal_id);
		const image = journal.image;

		const deleted = await Journal.deleteOne({id: journal_id});
		if(deleted) {
			fs.unlink(image,(err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send({
                        message: "Journal deleted succesfully!"
                    });
                }
            });
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	createJournal, 
	editJournal, 
	getAllJournals, 
	getAllJournalIds, 
	viewJournal, 
	addEditors, 
	removeEditors,
	changeAuthor, 
	deleteJournal
};
