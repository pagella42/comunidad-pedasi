const express = require('express')
const router = express.Router()
const Comment = require('../schemas/Comment')
const User = require('../schemas/User')
const Post = require('../schemas/Post')


router.post('/data/comment', async (req, res) => {
    let {content,date,postId,usersPhone} = req.body
    let comment = new Comment({
        content,
        date,
    })
    comment.user = await User.findOne({
        phone: usersPhone
    })
    comment.post = await Post.findById(postId)
    comment.save(async (err, comment) => {
        await User.findOneAndUpdate({
            phone: usersPhone
        }, {
            $push: {
                comments: comment
            }
        })
        await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: comment
            }
        })
        res.end()
    })

})

router.get('/data/comments/:postId', (req, res) => {
    Comment.find({
            "post": req.params.postId
        })
        .populate('user')
        .sort('-date')
        .exec((err, comments) => {
            comments = comments.map(c => {
                console.log(c)
                return {
                    _id: c._id,
                    user: c.user.name,
                    content:c.content,
                    date:c.date
                }
            })
            res.send(comments)

        })
})  


module.exports = router