const express = require('express')
const mongoose = require('mongoose')
const config = require('config');
const path = require('path')
const cookieParser = require('cookie-parser')
const loginRegRouter = require('./routes/loginReg.js') 
const homeRouter = require('./routes/homepage')
const adminRouter = require('./routes/adminpage')


const app = express()


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser(config.get('cookie')))


// home
app.use('/', homeRouter)

// register & login
app.use('/home', loginRegRouter)

// admin
app.use('/admin', adminRouter)


const PORT = process.env.PORT || config.get('port') || 3000;

    (async function start() {
        try {
            await mongoose.connect(config.get('mongoURL'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            app.listen(PORT, () => {
                console.log(`App has been started on port ${PORT}...`)
            })

        } catch (e) {
            console.log(e)
        }
    })()