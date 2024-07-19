const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
}, { timestamp: true })

const CategoryModel = mongoose.model('category', CategorySchema)

module.exports = CategoryModel