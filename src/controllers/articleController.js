const { Article } = require("../models/article");
const { User } = require("../models/user");
const { Journal } = require("../models/journal");
const fs = require("fs");
const {mail} = require("../utils/mailing");

//@route    POST /addArticle
//@descr    Add a article
//@access   Private

const addArticle = async (req, res) => {
  try {
    const { journal_id, peer_choice, article_name, authors, article_type } = req.body;

    let country = new Set();
    for (let i = 0; i < peer_choice.length; i++) {
      country.add(peer_choice[i].countryValues);
    }
    
    if(country.size != 4) {
      return res.send({
        message: "All reviewers must be from different countries."
      })
    }

    const user = await User.findById(req.rootuser._id);
    if(country.has(user.country)) {
      return res.send({
        message: "Reviewer needs to be of different country from the author"
      });
    }

    if (!journal_id) {
      return res.send({
        message: "Journal_id cannot be empty",
      });
    }
    if (!req.file) {
      return res.send({
        message: "File cannot be empty",
      });
    }

    const newArticle = new Article({
      article_name: article_name,
      original_name: req.file.originalname,
      journal: journal_id,
      submitted_by: req.rootuser,
      path: req.file.path,
      size: req.file.size,
      status: "Under Review",
      peer_choice: peer_choice,
      authors: authors,
      article_type: article_type
    });
    
    const journal = await Journal.findById(journal_id);
    let editorIds = journal.editors;
    
    const allEditors = await User.find({_id:{  $in:editorIds}});

    let mailingList = [];
    for (let i = 0; i < allEditors.length; i++) {
      mailingList.push(allEditors[i].email);
      
    }
    const mailBody = `<h4>Greetings from Journopedia Team,</h4>
    <p>A new article has been submitted by ${user.name} . 
    The article has been submitted under the journal - ${journal.journal_name} .<br> 
    Please review the article and examine it for peer review process.
    </p>
    <div>Author Details <br> 
    Name - ${user.name} <br> 
    Email - ${user.email} <br> 
    Phone - ${user.phone} <br> 
    Designation - ${user.designation} <br> 
    Institute - ${user.institute} <br> 
    Country - ${user.country} <br> 
    </div>
    <br>
    <div>Regards,<br>Team JournPedia</div>`;

    const attachments = [{
      filename: req.file.originalname,
      path: req.file.path
    }];

    const save = await newArticle.save();

    if (save) {
      const id = req.rootuser._id;
      const total_submitted = req.rootuser.total_submitted;
      const update = await User.findByIdAndUpdate(id, {
        total_submitted: total_submitted + 1,
      });
      mail(mailingList,mailBody,attachments);
      res.send({
        message: "Article added successfully!",
      });
    } else {
      res.send({
        message: "Article not added!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//@route    GET /downloadArticle/:article_id
//@descr    Download Article by Id
//@access   Public

const downloadArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const findArticle = await Article.findById(article_id);
    let downloads = findArticle.downloads;

    const update = await Article.findByIdAndUpdate(article_id, {
      downloads: downloads + 1
    });
    if (update) {
      res.download(findArticle.path);
    }
  } catch (error) {
    console.log(error);
  }
};

//@route    DELETE /deleteArticle/:article_id
//@descr    Delete a article by Id
//@access   Private

const deleteArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const article = await Article.findById(article_id);
    const path = article.path;

    const deleted = await Article.deleteOne({ id: article_id });

    if (deleted) {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            message: "Article deleted succesfully!",
          });
        }
      });
    } else {
      res.send({
        message: "Article not found!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//@route    POST /referArticle/:article_id
//@descr    Forward artcile for peer review
//@access   Private

const referArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const { option } = req.body;

    const article = await Article.findById(article_id);
    const journal_id = article.journal;
    const journal = await Journal.findById(journal_id);
    const editorList = journal.editors;
    const author = await User.findById(article.submitted_by);

    let mailingList = [];
    for (let i=0; i<article.peer_choice.length; i++) {
      mailingList.push(article.peer_choice[i].email)
    }

    const mailBody = `<h4>Greetings from Journopedia Team,</h4>
    <p>You have been choosen to peer review an article by ${author.name} . The article has been accepted by our editorial team. 
    The article has been submitted under the journal - ${journal.journal_name}.<br> 
    Please review the article and score it for further publishing process.
    </p>
    <div>Author Details <br> 
    Name - ${author.name} <br> 
    Email - ${author.email} <br> 
    Phone - ${author.phone} <br> 
    Designation - ${author.designation} <br> 
    Institute - ${author.institute} <br> 
    Country - ${author.country} <br> 
    </div>
    <p>Kindly revert back with your review of the article to the author.</p>
    
    <div>Regards,<br>Team JournPedia</div>`;

    const attachments = [{
      filename: article.original_name,
      path: article.path
    }];
    
    if (editorList.includes(req.rootuser._id)) {
      if (option == "Yes") {
        mail(mailingList,mailBody,attachments);
        updateStatus = await Article.findByIdAndUpdate(article_id, {
          status: "Under Peer Review",
        });
      } else {
        updateStatus = await Article.findByIdAndUpdate(article_id, {
          status: "Rejected",
        });
      }
    } else {
      return res.send({
        message: "Unauthorized",
      });
    }
    if (updateStatus) {
      res.send({
        message: "Article status updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//@route    GET /allArticlesForReferral
//@descr    Fetch all articles to be referred for peer review
//@access   Private

const allArticlesForReferral = async (req, res) => {
  try {
    const journals = await Journal.find({ editors: req.rootuser._id });
    let journalIds = [];

    for (let i = 0; i < journals.length; i++) {
      journalIds.push(journals[i]._id);
    }

    const articles = await Article.find({ journal: { $in: journalIds } });

    if (articles && articles.length) {
      res.send(articles);
    } else {
      res.send({
        message: "No articles for review",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//@route	GET /articleStatus
//@descr	Get all articles with their status
//@access	Private

const articleStatus = async (req,res) => {
	try {
		
		const allArticles = await Article.find({submitted_by: req.rootuser._id});
		if(allArticles) {
			res.send(allArticles);
		} else {
			res.send({
				message: "No articles submitted"
			});
		}
		
	} catch (error) {
		console.log(error);
	}
}

//@route	GET /getNumberVolumes/:journal_id
//@descr	Get no. of all volumes
//@access	Public

const getNumberVolumes = async(req,res)=> {
	try {
		const {journal_id} = req.params;

		const allArticles = await Article.find({journal: journal_id});
    
    let yearList = new Set();
    for (let i = 0; i < allArticles.length; i++) {
        yearList.add((allArticles[i].date_of_submission).getFullYear());
    }
    let volumes = [...yearList];
    volumes = volumes.sort().reverse();
    return res.send({
      volumes,
      journal_id
    });
    
	} catch (error) {
		console.log(error);
	}
}

//@route  GET /:journal_id/volume/:year
//@descr  Get a particular volume
//@access Public

const volume = async (req,res) => {
  try {
    const {year,journal_id} = req.params;

    const startDate = new Date(year);
    const endDate = new Date( (new Date(year, 12,1))-1 );

    const allArticles = await Article.find({
      journal: journal_id,
      date_of_submission: {
        $gte: startDate,
        $lte: endDate
      }
    });

    if(allArticles) {
      res.send(allArticles);
    } else {
      res.send({
        message: "No articles found"
      });
    }
    
  } catch (error) {
    console.log(error);
  }
}

//@route	POST /searchArticles
//@descr	Get all articles using a filter
//@access	Public

const searchArticles = async (req,res) => {
	try {
		const {article_type, status, journal} = req.body;
		
		const startDate = new Date(req.body.startDate).toISOString();
		const endDate = new Date(req.body.endDate).toISOString();

		const allArticles = await Article.find(		
				{
					journal: {$in: journal},
					status: {$in: status},
					article_type: {$in: article_type},
					date_of_submission: {
						$gte: startDate,
						$lte: endDate
					}
				}
		);
		
		if(allArticles) {
			res.send(allArticles);
		} else {
			res.send({
				message: "No Articles Found"
			});
		}

	} catch (error) {
		console.log(error);
	}
}

module.exports = {
  addArticle,
  downloadArticle,
  deleteArticle,
  referArticle,
  allArticlesForReferral,
  articleStatus,
  getNumberVolumes,
  volume,
  searchArticles
};
