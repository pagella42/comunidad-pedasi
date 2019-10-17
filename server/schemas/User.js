const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    phone:String,
    adress:String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
})

const User = mongoose.model('User',userSchema)

module.exports=User