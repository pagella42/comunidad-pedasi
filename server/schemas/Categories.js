const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    categories:[String]
})

const Categories = mongoose.model("category",categorySchema)

module.exports = Categories