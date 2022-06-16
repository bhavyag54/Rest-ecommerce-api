const mongoose = require("mongoose")
const crypto = require("crypto")
const uuid = require("uuid")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        required: true,  
    },
    salt: String,


},{timestamps: true})

userSchema.virtual("password")
.set(function(password) {
    this.salt = uuid.v1()
    this.pass = this.securePassword(password)
})
.get(() => {
    return this.pass
})

userSchema.methods = {
    authenticate: function(ppassword) {
        return this.securePassword(ppassword) === this.pass
    },

    securePassword: function(ppassword) {
        
        if(!ppassword)
            return ""
    
        try {
            return crypto.createHmac("sha256", this.salt)
            .update(ppassword)
            .digest("hex")
        }
        catch (err) {
            return ""
        }

    }

}

module.exports = mongoose.model("User", userSchema)