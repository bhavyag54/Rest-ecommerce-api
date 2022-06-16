const express = require("express")
const mongoose = require("mongoose")

const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require('./routes/user')
const buyerRoutes = require('./routes/buyer')
const sellerRoutes = require('./routes/seller')
const { buyerRole } = require("./controllers/buyer")
const { sellerRole } = require("./controllers/seller")

// DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB CONNECTED")
})
.catch((err) => {
    console.log("Unable to connect to database")
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// Auth API
app.use('/api', userRoutes)

// Buyer API
app.use('/api',[buyerRole], buyerRoutes)

// Seller API
app.use('/api',[sellerRole], sellerRoutes)


app.listen(process.env.PORT, console.log(`Listening on ${process.env.PORT}`))