const { Article } = require("../models/article");
const { User } = require("../models/user");
const { Journal } = require("../models/journal");
const fs = require("fs");

//@route    POST /addArticle
//@descr    Add a article
//@access   Private

const addArticle = async (req, res) => {
  try {
    const { journal_id, peer_choice, article_name, authors } = req.body;

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

    let peer_mails = [];
    let author_mails = [];

    const findReviewers = await User.find({
      email: {
        $in: peer_choice,
      },
    });
    const findAuthors = await User.find({
      email: {
        $in: authors,
      },
    });

    for (let i = 0; i < findReviewers.length; i++) {
      peer_mails.push(findReviewers[i]._id);
    }
    for (let i = 0; i < findAuthors.length; i++) {
      author_mails.push(findAuthors[i]._id);
    }

    const newArticle = new Article({
      article_name: article_name,
      original_name: req.file.originalname,
      journal: journal_id,
      submitted_by: req.rootuser,
      path: req.file.path,
      size: req.file.size,
      status: "Under Review",
      peer_choice: peer_mails,
      authors: author_mails,
    });
    const save = await newArticle.save();

    if (save) {
      const id = req.rootuser._id;
      const total_submitted = req.rootuser.total_submitted;
      const update = await User.findByIdAndUpdate(id, {
        total_submitted: total_submitted + 1,
      });
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
      downloads: downloads + 1,
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

//@route    POST /referArticle
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

    if (editorList.includes(req.rootuser._id)) {
      if (option == "Yes") {
        //Mailing
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

module.exports = {
  addArticle,
  downloadArticle,
  deleteArticle,
  referArticle,
  allArticlesForReferral,
};
