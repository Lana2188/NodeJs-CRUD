const { Router } = require('express')
const router = Router();
const {homePage} = require('../controller/homeController')



router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/home', homePage)





module.exports = router