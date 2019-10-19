const express = require('express')
const router = express.Router()
const User = require('../schemas/User')

router.post('/data/user',(req,res)=>{
    let user = new User(req.body)
    user.save()
    res.end()
})





module.exports= router