const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: Number,
    }],

    bill: {
        type: String,
        required: true,
        trim: true,
    }

}, {timestamps: true})


module.exports = mongoose.model('Order', orderSchema)
