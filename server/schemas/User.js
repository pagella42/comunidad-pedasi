const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    phone:String,
    address:String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
    ban:Boolean,
    banReason:String,
    isActive:Boolean
})

const User = mongoose.model('User',userSchema)


module.exports=User