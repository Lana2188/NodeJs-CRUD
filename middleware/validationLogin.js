const { check, validationResult } = require('express-validator')


module.exports.authLogin = [
    check('email', 'Մուտքագրված տվյալներում սխալ կա:').isEmail(),
    check('password', 'Մուտքագրված տվյալներում սխալ կա:').isLength({ min: 7 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let errArray = errors.array()

            for (let errobj of errArray) {
                return res.render('login', { message: errobj.msg })
            }


        } else next()
    }
]