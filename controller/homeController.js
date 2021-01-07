const { Article } = require('../models/article')



class homePageArticles {

    async homePage(req, res) {

        const articles = await Article.find().sort({_id: -1})
        
            res.render('home.ejs',{articles,})               
        }


    }



module.exports = new homePageArticles()