const express = require('express')
const router = express.Router()
const Post = require('./schemas/Post')
const User = require('./schemas/User')
const Response = require('./schemas/Response')
const Categories =require('./schemas/Categories')

router.put('/data/post/status/:status/:postId',(req,res)=>{
    Post.findByIdAndUpdate(req.params.postId,{
        "$set":{
            status:req.params.status
        }
    })
})

router.post('/data/response/:postId',(req, res) => {
    let response = new Response(req.body)
    Post.findByIdAndUpdate(req.params.postId, {
        "$push": {
            "responses": response
        }
    }, {
        "new": true
    }, (err, post) => {
        response.post = post
        response.save()
        console.log(post)
        res.send(response)
    })
})


router.get('/data/posts', async (req, res) => {
    Post.find({})
        .populate("user")
        .exec((err, post) => {
            res.send(post)
        })
})

router.get('/data/posts/category/:category', async (req, res) => {
    let posts = await Post.find({
        "category": req.params.category
    })
    res.send(posts)
})

router.get('/data/posts/id/:id', async (req, res) => {
    let post = await Post.findById(req.params.id)
    console.log(req.params.id)
    res.send(post)
})

const updateUserPosts = (usersPhone, post) => {
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
    post.user = await User.findOne({
        "phone": req.params.usersPhone
    })
    post.save((err, doc) => console.log(doc))

    updateUserPosts(req.params.usersPhone, post)
        .then((doc) => res.send(doc))

})

router.get('/data/categories',(req,res)=>{
    Categories.find({},(err,doc)=>res.send(doc))
}) 


module.exports = router