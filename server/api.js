const express = require('express')
const router = express.Router()
const Post = require('./schemas/Post')
const User = require('./schemas/User')
const Response = require('./schemas/Response')
const Category = require('./schemas/Category')
const Comment =require('./schemas/Comment')

router.put('/data/post/status/:status/:postId', (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
        "$set": {
            status: req.params.status
        }
    })
})

router.post('/data/response/:postId', (req, res) => {
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

router.get('/data/posts/id/:id', (req, res) => {
    Post.findById(req.params.id)
    .populate("user")
    .exec((err,post)=>res.send(post))
})


router.post('/data/post/:usersPhone', async (req, res) => {
    let post = new Post(req.body)
    post.user = await User.findOne({
        "phone": req.params.usersPhone
    })
    post.save((err, doc) => console.log(doc))
    
    updateUserPosts(req.params.usersPhone, post)
    .then((doc) => res.send(doc))
    
})

router.get('/data/categories', (req, res) => {
    Category.find({}, (err, doc) => res.send(doc))
})

router.post('/data/category/:categoryName',(req,res)=>{
    let category= new Category({name:req.params.categoryName})
    category.save()
    res.end()
})

router.put('/data/category/:categoryName',(req,res)=>{
    Category.findOneAndDelete({name:req.params.categoryName})
    .then(()=>res.end())
})

router.post('/data/comment', async (req,res)=>{
    let {content,date,postId,usersPhone}=req.body
    let comment = new Comment({
        content,
        date,
    })
    comment.user = await User.findOne({phone: usersPhone})
    comment.post = await Post.findById(postId)
    comment.save( async (err,comment)=>{
        await User.findOneAndUpdate({phone:usersPhone},
            {$push:{comments:comment}})
        await Post.findByIdAndUpdate(postId,
            {$push:{comments:comment}})    
        res.end()
    })

})

router.get('/data/comments/:postId',(req,res)=>{
    Post.findById(req.params.postId)
    .populate({
        path:'comments',
        populate:{
            path:"user"
        } 
    })
    .exec((err,post)=>{
        let comments=post.comments.map(c=>{
            return{
                content:c.content,
                user:c.user.name
            }
        })
        res.send(comments)
    })
})



function updateUserPosts (usersPhone, post) {
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
module.exports = router