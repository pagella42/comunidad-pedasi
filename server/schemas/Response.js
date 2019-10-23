const mongoose = require('mongoose')
const Schema = mongoose.Schema

const responseSchema = new Schema({
    content: String,
    date: String,
    employee: String,
    post:{type: Schema.Types.ObjectId, ref: 'Post'},
})


const Response = mongoose.model('Response',responseSchema)

module.exports = Response