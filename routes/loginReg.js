const {Router} = require('express')
const {authReg} = require('../middleware/validationReg')
const {authLogin} = require('../middleware/validationLogin')
const {getReg, postReg, getLogin, postLogin} = require('../controller/loginRegController')
const router = Router()


// home/registration
router.route('/registration').get(getReg)
.post(authReg, postReg)

// home/login
router.route('/login').get(getLogin)
.post(authLogin, postLogin)




module.exports = router