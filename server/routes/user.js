const express = require('express')
const router = express.Router()
const User = require('../schemas/User')
const Post = require('../schemas/Post')



router.post('/data/user',(req,res)=>{
    console.log(req.body)
    let user = new User(req.body)
    user.ban=false
    user.save()
    res.end()
})
router.get('/data/user/:usersPhone',(req,res)=>{
    
    User.findOne({phone:req.params.usersPhone})
    .exec((err,user)=>res.send(user))
})
router.put('/data/user/:usersPhone',(req,res)=>{
    let obj={}
    Object.keys(req.body).forEach(o=>{
        if(req.body[o]){obj[o]=req.body[o]}
    })
    User.findOneAndUpdate({phone:req.params.usersPhone},{
        $set:obj
    },(()=>res.end()))
})
router.get('/data/users', (req,res)=> {
    User.find({}, (error, response) => res.send(response) )
})

router.post('/data/user/availability',async(req,res)=>{
    let arr = Object.keys(req.body)
    let available = {}
    for(let o of arr){
        let obj = {[o]:req.body[o]}
        await User.findOne(obj,((err,doc)=>doc ? available[o] = true : null))
    }
    console.log(available)
    res.send(available)
})

router.get('/data/posts/:usersPhone', async (req,res)=>{
    let user = await User.findOne({phone:req.params.usersPhone})
    Post.find({'user':user._id})
    .populate('comments responses user')
    .sort('-date')
    .exec((err,doc)=>res.send(doc))
})




module.exports= router
