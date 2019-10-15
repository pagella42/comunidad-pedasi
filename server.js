const express = require ('express')
const bodyParser = require ('body-parser')
const api = require ('./server/api')
const mongoose = require ('mongoose')

const app = express()
const PORT = 4000

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

mongoose.connect('mongodb://localhost/pedasiDB',{useNewUrlParser:true},()=>console.log("mongood"))

app.use('/',api)

app.listen(PORT,()=>console.log(`Running on port: ${PORT}`))