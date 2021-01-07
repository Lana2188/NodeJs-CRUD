const { Article } = require('../models/article')
const { Blacklist } = require('../models/token')
const fs = require('fs')


class adminPage {

    // Article creation page
    getCreateArticle(req, res) {
        res.render('admin-createArticle', {errmassage:''})
    };


    // Article creation
    async postCreateArticle(req, res) {

        try {

            const { title, description, content } = req.body
            const { filename } = req.file

            const newArticle = new Article({
                title: title,
                description: description,
                content: content,
                imgname: filename
            })

            await newArticle.save()
            return res.redirect('/admin/articles')
        } catch (e) {
            // console.log(e)
            const info = req.body
            res.render('admincreate-err.ejs', {errmassage: 'Լրացրեք բոլոր դաշտերը',info})
        }


    };

    // articles editing  route /admin/articles
    async artEd(req, res) {

        const rows = await Article.find().sort({_id: -1})
        res.render('articles', { rows })

    };
    // /admin/article/read   get page

    async readPage(req, res) {
        const id = req.query.id
        const article = await Article.findOne({ _id: id })
        res.render('read', { article })
    }





    // admin/article/edit  get   
    async editPage(req, res) {
        const id = req.query.id
        const article = await Article.findOne({ _id: id })
        res.render('edit', { article })
    };


    // admin/article/edit post

    async saveEditedArticle(req, res) {

        try {

            const { id, title, description, content, imgname } = req.body
            // console.log(id)
            let imgNewname = '';
            if (req.file) {
                imgNewname = req.file.filename
                fs.unlinkSync(__dirname + '/../public/uploads/' + imgname)

            } else {
                imgNewname = imgname
            };

            const updated = await Article.updateOne({ _id: id }, {
                title: title,
                description: description,
                content: content,
                imgname: imgNewname

            })

            return res.redirect('/admin/articles')
        } catch (e) {
            console.log(e)
        }


    };

    // admin/article/delete   get delete page

    async deletepage(req, res) {
        const id = req.query.id
        // console.log(id)
        const article = await Article.findOne({ _id: id })
        res.render('delete', { article })
    };

    // delate article

    async deleteArticle(req, res) {
        try {

            const { id } = req.query
            // console.log(id)
            const deletedArticle = await Article.deleteOne({ _id: id })

            return res.redirect('/admin/articles')
        } catch (e) {
            console.log(e)
        }

    };



    // destroy  /admin/logout
    async tokenDestroy(req, res) {
        // console.log(req.cookies['x-acces-token'])
const adminToken = req.cookies['x-acces-token']
        const listed = new Blacklist({
            token: adminToken
        })
        await listed.save()
        return res.redirect('/home')
    }

}

module.exports = new adminPage()