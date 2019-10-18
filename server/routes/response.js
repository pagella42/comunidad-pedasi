const express = require('express')
const router = express.Router()
const Response = require('../schemas/Response')
const Post = require('../schemas/Post')
const User = require('../schemas/User')


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
        res.send(response)
    })
})

router.get('/data/responses/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate('responses')
        .exec((err, post) => res.send(post.responses))
})

module.exports= router