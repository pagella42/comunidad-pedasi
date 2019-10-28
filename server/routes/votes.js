const express = require('express')
const router = express.Router()
const Vote = require('../schemas/Vote')

router.post('/data/votes/:postId/:usersPhone', (req, res) => {
    let vote = new Vote({
        postId: req.params.postId,
        usersPhone: req.params.usersPhone
    })
    vote.save()
    res.end()
})

router.delete('/data/votes/:postId/:usersPhone', (req, res) => {
    const {
        postId,
        usersPhone
    } = req.params
    Vote.findOneAndDelete({
        postId,
        usersPhone
    }, (() => res.end()))
})

router.get('/data/votes/:postId', async (req, res) => {
    const { postId,usersPhone} = req.params
    let num = await Vote.find({
        postId: req.params.postId
    })
    res.send({votes: num.length, voted:null})
})

router.get('/data/votes/:postId/:usersPhone', async (req, res) => {
    const { postId,usersPhone} = req.params
    let num = await Vote.find({
        postId: req.params.postId
    })
    Vote.findOne({ postId,usersPhone},
        ((err, doc) => {
            let bool = doc ? true : false
            res.send({
                voted: bool,
                votes: num.length
            })
        }))
})

module.exports = router