const express = require('express')
const router = express.Router()
const Post = require('./schemas/Post')
const User = require('./schemas/User')



router.get('/data/posts', async (req, res) => {
    let posts = await Post.find({})
    res.send(posts)
})

const updateUserPosts=(usersPhone,post)=>{
    return User.findOneAndUpdate({
        "phone": usersPhone
    }, {
        "$push": {
            "posts": post
        }
    }, {
        "new": true
    })
}

router.post('/data/post', async (req, res) => {
    let post = new Post(req.body.post)
    post.user= await User.findOne({"phone":req.body.usersPhone})
    post.save((err,doc)=>console.log(doc)) 
    
    updateUserPosts(req.body.usersPhone,post)
    .then((doc)=>res.send(doc))
    
})

module.exports= router