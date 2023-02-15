const { spawn } = require("child_process");
const { Article } = require("../models/article");
const { Journal } = require("../models/journal");

const articleRecommender = async function (req, res) {
    try {
        
        let dataToSend = [];
        const { articleId } = req.params;

        const allArticles = await Article.find();
        const findJournal = await Journal.findById(allArticles[0].journal)
        
        let dataObj = {};
        let ar = [];

        for(let i=0;i<allArticles.length;i++) {
            let obj = {};
            
            let peers = "";
            let authors = "";
            for(let j=0;j<allArticles[i].peer_choice.length;j++) {
                peers += allArticles[i].peer_choice[j].name;
                peers += " ";
            }
            for(let j=0;j<allArticles[i].authors.length;j++) {
                authors += allArticles[i].authors[j].name;
                authors += " ";
            }

            let tags = [findJournal.journal_name, allArticles[i].original_name.split(".")[0], allArticles[i].article_name, allArticles[i].article_type, allArticles[i].abstract, authors, peers].join(" ");
            obj.id = allArticles[i]._id.toString();
            obj.tags = tags.toLowerCase();
            ar.push(obj);
            obj = {};

        }

        dataObj = ar;
        dataObj = JSON.stringify(dataObj);
        dataObj = dataObj.replace(/'/g, '"');

        const python = spawn('python', ['src/recommenders/articleRecommender.py', dataObj, articleId]);

        python.stdout.on('data', function (data) {
            dataToSend.push(data.toString());
        });

        python.on('close', async (code) => {
            let articleIdsRecommended = [];

            for(let i=0;i<dataToSend.length;i++) {
                let key = dataToSend[i].trim();
                ar.forEach(obj => {
                    if(obj.id === key) {
                        articleIdsRecommended.push(obj.id);
                    }
                }); 
            }

            const allArticlesRecommended = await Article.find({_id: {$in: articleIdsRecommended}})
            if(allArticlesRecommended.length > 0) {
                res.send(allArticlesRecommended);
            } else {
                res.send({
                    message: "No Similar Articles Found"
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { articleRecommender }