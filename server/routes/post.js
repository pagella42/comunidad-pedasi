
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

function makeFilterObject(category,status,language,private,user){
    let obj={}
    category? obj.category=category:null
    status? obj.status=status:null
    language? obj.language=language: null
    private? obj.private=private: null
    user? obj.user=user:null
    return obj
}

router.post('/data/post/:usersPhone', async (req, res) => {
    let post = new Post(req.body)
    post.points=0
    post.status="pending"
    post.user = await User.findOne({
        "phone": req.params.usersPhone
    })
    post.save()

    updateUserPosts(req.params.usersPhone, post)
        .then((doc) => res.send(doc))

})

router.post('/data/posts', async (req,res)=>{
    let{sort,category,status,language,private,user}=req.body
    Post.find(makeFilterObject(category,status,language,private,user))
    .populate(`user comments responses`)
    .sort(sort ? {[sort.by]:sort.order} : {date:-1})
    .exec((err,doc)=>res.send(doc))
})





router.get('/data/posts/id/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate("user comments responses")
        .exec((err, post) => res.send(post))
})

router.put('/data/post/points/:postId/:vote',(req,res)=>{
    const {postId,vote}=req.params
    Post.findByIdAndUpdate(postId,{
        $inc:{points: vote=="post"? 1 : vote=="delete"? -1 :null}
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
