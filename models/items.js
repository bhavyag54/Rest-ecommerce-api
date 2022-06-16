const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    discription: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: Number,
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    catalog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog'
    }
})

module.exports = mongoose.model('Item', itemSchema)