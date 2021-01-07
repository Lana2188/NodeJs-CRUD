const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imgname: { type: String, required: true },

})

const Article = model('article', articleSchema)

module.exports = { Article }