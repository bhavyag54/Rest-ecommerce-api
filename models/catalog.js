const mongoose = require("mongoose")

const catalogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},  {timestamps: true})


module.exports = mongoose.model("Catalog", catalogSchema)