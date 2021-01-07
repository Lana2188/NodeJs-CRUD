const { check, validationResult } = require('express-validator')


module.exports.authReg = [
    check('email', 'Էլ.հասցե չէ...').isEmail(),
    check('password', 'Ծածկագիրը պետք է կազմված լինի առնվազն 7 նիշից...').isLength({ min: 7 }),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let errArray = errors.array()
            let errmes = ''
            for (let errobj of errArray) {
                errmes += `${errobj.msg}<br>`
            }

            return res.render('registration', { message: errmes })
        } else next()
    }
]