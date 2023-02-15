const { spawn } = require("child_process");
const { Article } = require("../models/article");
const { Journal } = require("../models/journal");

const articleRecommender = async function (req, res) {
    try {
        // let large = []
        let dataToSend = [];
        const { articleId } = req.params;

        const allArticles = await Article.find();
        const findJournal = await Journal.findById(allArticles[0].journal)

        // res.send(allArticles)
        
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
            
            // dataObj['id'] = allArticles[i]._id;
            // dataObj['tags'] = tags.toLowerCase();
            // dataObj[allArticles[i]._id] = tags.toLowerCase();
            // dataObj[i] = allArticles[i]._id;
            // dataObj[i].tags = tags.toLowerCase();
        }
        // console.log(dataObj['63dd3b446e88027291afde3e']);
        dataObj = ar;
        dataObj = JSON.stringify(dataObj);
        dataObj = dataObj.replace(/'/g, '"');
        // console.log(dataObj);
        // console.log(ar);
        // return

        const python = spawn('python', ['src/recommenders/articleRecommender.py', dataObj, articleId]);

        python.stdout.on('data', function (data) {
            // console.log(data)
            dataToSend.push(data.toString());
        });
        python.on('close', async (code) => {
            let articleIdsRecommended = [];
            // console.log(dataToSend)
            // console.log(dataObj);
            for(let i=0;i<dataToSend.length;i++) {
                let key = dataToSend[i].trim();
                ar.forEach(obj => {
                    if(obj.id === key) {
                        articleIdsRecommended.push(obj.id);
                    }
                }) 
            }

            const allArticlesRecommended = await Article.find({_id: {$in: articleIdsRecommended}})
            // console.log(allArticlesRecommended);
            res.send(allArticlesRecommended);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { articleRecommender }