const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const commentModel = new Schema({
    content:String,
    date:String,
    post:{type: Schema.Types.ObjectId,ref: "Post"},
    user:{type: Schema.Types.ObjectId, ref: "User"}
})

const Comment = mongoose.model('Comment',commentModel)

module.exports= Comment