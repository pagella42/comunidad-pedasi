const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    postId:String,
    usersPhone:String
})

const Vote = mongoose.model("Vote", voteSchema)

module.exports = Vote