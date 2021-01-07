const jwt = require('jsonwebtoken')
const config = require('config')
const { Blacklist } = require('../models/token')


module.exports = (req, res, next) => {

    try {
        // console.log(req.cookies['x-acces-token'])


        const token = req.cookies['x-acces-token']

        if (!token) {
            res.redirect('/home/login')
        } else {
            
            Blacklist.findOne({ token: token }).then((listedToken)=>{

                if (!listedToken) {
                  jwt.verify(token, config.get('jwtkey'), (err, decoded) => {
                if (err) {
                    console.log('Err:token')
                    return res.redirect('/home/login')
                }
                req.user = decoded
                next()
            }) 
            } else {
                //  console.log('Blacklist ' + listedToken)
              return  res.redirect('/home/login')
            }
           
            })
            

         
        }

    } catch (e) {
        console.log('Error:' + e)

    }


}