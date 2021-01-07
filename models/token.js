const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
    token: { type: String, required: true },
    
})

const Blacklist = model('blacklist', tokenSchema)

module.exports = { Blacklist }