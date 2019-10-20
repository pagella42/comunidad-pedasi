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

router.get('/data/comments/:postId/:sortBy?', (req, res) => {
    const sortBy= req.params.sortBy
    Post.findById(req.params.postId)
        .populate({
            path: 'comments',
            populate: {
                path: "user"
            }
        })
        // .sort(sortBy==='points'? {points:-1}: {date:-1})
        .exec((err, post) => {
            let comments = post.comments.map(c => {
                return {
                    content: c.content,
                    user: c.user.name,
                    date: c.date
                }
            })
            res.send(comments)
        })
})

module.exports = router