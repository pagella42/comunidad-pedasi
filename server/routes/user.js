const express = require('express')
const router = express.Router()
const User = require('../schemas/User')
const Post = require('../schemas/Post')



router.post('/data/user',(req,res)=>{
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
    
    User.findOneAndUpdate({phone:req.params.usersPhone},{
        $set:req.body
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