const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    cover: String
})

module.exports = mongoose.model('product', productschema)