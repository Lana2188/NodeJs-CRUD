const { Router } = require('express')
const router = Router();
const token = require('../middleware/auth.token')
const upload  = require('../middleware/multer')
const { getCreateArticle, postCreateArticle, artEd,
        editPage, saveEditedArticle, deletepage, 
        deleteArticle, readPage, tokenDestroy } = require('../controller/adminController')



// /admin
router.route('/').get(token, (req, res) => {
    res.render('admin')
})

// /admin/articles
router.route('/articles').get(token, artEd)


// /admin/create-article
router.route('/create-article', token).get(getCreateArticle)
    .post(upload, postCreateArticle)


// /admin/article/read
router.route('/article/read', token).get(readPage)


// /admin/article/edit
router.route('/article/edit', token).get(editPage)
.post(upload, saveEditedArticle)


// /admin/article/delete
router.route('/article/delete', token).get(deletepage)
.post(deleteArticle)

// /admin/logout
router.route('/logout',token).get(tokenDestroy)


module.exports = router