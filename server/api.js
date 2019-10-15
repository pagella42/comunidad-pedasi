const express = require('express')
const router = express.Router()
const Post = require('./schemas/Post')
const User = require('./schemas/User')
const data = require('./data')



router.get('/data/posts', async (req, res) => {
    let posts = await Post.find({})
    res.send(posts)
})

router.post('/data/post', async (req, res) => {
    let post = new Post(req.body)
    await post.save()
    let user = await User.findById(post.user)
    user.posts.push(post)
    await user.save()
    // await User.findByIdAndUpdate(
    //     post.user
    // , {
    //     "$push": {
    //         "posts": post
    //     }
    // }, {
    //     "new": true
    // })
    // console.log(user)
    res.send(user)
})
module.exports = router