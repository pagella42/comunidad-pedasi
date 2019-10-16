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
    post.save()
    // console.log('user',user)
    // await User.findOneAndUpdate({
    //     "_id": post.user
    // }, {
    //     "$push": {
    //         "posts": "post"
    //     }
    // }, {
    //     "new": true
    // })
    let user = await User.findOne({"_id":post.user})
    console.log(user)
    res.send(user)
})
module.exports = router