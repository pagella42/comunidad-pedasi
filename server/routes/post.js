const express = require('express')
const router = express.Router()
const Post = require('../schemas/Post')
const User = require('../schemas/User')


function updateUserPosts(usersPhone, post) {
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

router.post('/data/post/:usersPhone', async (req, res) => {
    let post = new Post(req.body)
    post.points=0
    post.user = await User.findOne({
        "phone": req.params.usersPhone
    })
    post.save((err, doc) => console.log(doc))

    updateUserPosts(req.params.usersPhone, post)
        .then((doc) => res.send(doc))

})


router.get('/data/posts', async (req, res) => {
    Post.find({})
        .populate("user")
        .exec((err, post) => {
            res.send(post)
        })
})

router.get('/data/posts/id/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate("user")
        .exec((err, post) => res.send(post))
})

router.put('/data/post/points/:postId/:vote',(req,res)=>{
    const {postId,vote}=req.params
    Post.findByIdAndUpdate(postId,{
        $inc:{points: vote=="up"? 1 : vote=="down"? -1 :null}
    },(err,doc)=>res.send(doc))
})

router.put('/data/post/status/:status/:postId', (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        "$set": {
            status: req.params.status
        }
    },{new:true},(err,doc)=>res.send(doc))
})

module.exports= router