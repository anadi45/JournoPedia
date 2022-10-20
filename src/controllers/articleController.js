const {Article} = require("../models/article");
const {User} = require("../models/user");
const {Journal} = require("../models/journal");
const fs = require("fs");

//@route    POST /addArticle
//@descr    Add a article
//@access   Private

const addArticle = async (req,res) => {
    try {
        const {journal_id} = req.body;
        
        if(!journal_id) {
            return res.send({
                message: "Journal_id cannot be empty"
            });
        } 
        if(!req.file) {
            return res.send({
                message: "File cannot be empty"
            });
        } 

        const newArticle = new Article({
            original_name: req.file.originalname,
            journal: journal_id,
            submitted_by: req.rootuser,
            path: req.file.path,
            size: req.file.size,
            status:"Under Review"
        });
        const save = await newArticle.save();

        if(save) {
            const id = req.rootuser._id;
            const total_submitted = req.rootuser.total_submitted;
            const update = await User.findByIdAndUpdate(id,{total_submitted: total_submitted+1});
            res.send({
                message: "Article added successfully!"
            });
        } else {            
            res.send({
                message: "Article not added!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

//@route    GET /downloadArticle/:article_id
//@descr    Download Article by Id
//@access   Public

const downloadArticle = async (req,res) => {
    try {
        const {article_id} = req.params;
        const findArticle = await Article.findById(article_id);
        let downloads = findArticle.downloads;

        const update = await Article.findByIdAndUpdate(article_id,{downloads: downloads+1});
        if(update) {
            res.download(findArticle.path);
        }
        
    } catch (error) {
        console.log(error);
    }
}

//@route    DELETE /deleteArticle/:article_id
//@descr    Delete a article by Id
//@access   Private

const deleteArticle = async (req,res) => {
    try {
        const {article_id} = req.params;
        const article = await Article.findById(article_id);
        const path = article.path;
        
        const deleted = await Article.deleteOne({id: article_id});

        if(deleted) {
            fs.unlink(path,(err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.send({
                        message: "Article deleted succesfully!"
                    });
                }
            });
        } else {
            res.send({
                message: "Article not found!"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

//@route    POST /referArticle
//@descr    Forward artcile for peer review
//@access   Private

const referArticle = async (req,res) => {
    try {
        const {article_id} = req.params;
        const {option} = req.body;
        
        const article = await Article.findById(article_id);
        console.log(article)//find journal and then check for editors
        //Mailing 
        if(option) {
            updateStatus = await Article.findByIdAndUpdate(article_id,{status: "Under Peer Review"});
        } else {
            updateStatus = await Article.findByIdAndUpdate(article_id,{status: "Rejected"});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addArticle, downloadArticle, deleteArticle, referArticle};