const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema=new Schema({
    title:String,
    content:String,
    category:String,
    points:Number(0),
    date:String,
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    status:String,
    comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
    responses:[{type: Schema.Types.ObjectId, ref: 'Response'}],
    address:String,
    picture:String,
})

const Post = mongoose.model('Post',postSchema)

module.exports=Post

