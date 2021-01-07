const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


class loginReg {

  // registration page
  getReg(req, res) {
    res.render('registration', { message: '' })
  };


  // registration
  async postReg(req, res) {

    try {
      const { email, password } = req.body;
      const someone = await User.findOne({ email });

      if (someone) {
        return res.render('registration', { message: 'Էլ.հասցեն զբաղված է:' })
      }
      const hashedPass = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPass });

      await user.save();
      res.redirect('/home/login')

    } catch (e) {
      console.log(e)
    }
  }



  // login page
  getLogin(req, res) {   
    res.render('login', { message: '' })
  };

  // login
  async postLogin(req, res) {

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email })
      if (!user) {
        return res.render('login', { message: 'Սխալ տվյալներ...' })
      };
      
      const isMatch = await bcrypt.compare(password, user.password)
      // console.log(isMatch)

      if (!isMatch) {
        return res.render('login', { message: 'Սխալ տվյալներ...' })
      }


      // token sign
      const token = jwt.sign(
        { userId: user._id },
        config.get('jwtkey'),
        { expiresIn: '1h' },
      )


      // set cookie token
res.cookie('x-acces-token', token).status(200)
     
// console.log(token)

      
res.redirect('/admin')

    } catch (e) {
      console.log(e)
    }


  }


  

}

module.exports = new loginReg()