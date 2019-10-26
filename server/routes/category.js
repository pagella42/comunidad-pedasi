const express = require('express')
const router = express.Router()
const Category = require('../schemas/Category')
const Post = require('../schemas/Post')


router.post('/data/category/:categoryName', (req, res) => {
    let category = new Category({
        name: req.params.categoryName
    })
    category.save()
    res.end()
})

router.get('/data/posts/category/:category', async (req, res) => {
    let posts = await Post.find({
        "category": req.params.category
    })
    .sort({date:-1})
    .exec(()=>res.send(posts))
})

router.get('/data/categories', (req, res) => {
    Category.find({}, (err, doc) => res.send(doc))
})

router.put('/data/category/:categoryName', (req, res) => {
    Category.findOneAndDelete({
            name: req.params.categoryName
        })
        .then(() => res.end())
})

module.exports = router