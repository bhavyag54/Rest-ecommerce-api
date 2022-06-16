const express = require('express')
const { register, login, verifyToken, signout, genarateNewToken } = require('../controllers/user')
const {check, body} = require("express-validator")
const router = express.Router()

router.post('/auth/register', [
    check("name", "Name should be atleast 3 charecters").isLength({min: 3, max: 32}),
    check("email", "Invalid email").isEmail(),
    check("password", "Password's not secure enough, Try something else...").isStrongPassword(),
    body("role", "Role not found").custom(value => [1, 2].includes(value)) 
],register)


router.post('/auth/login', login)

router.get("/auth/signout", signout)
router.get("/auth/verify", [verifyToken], genarateNewToken)

module.exports = router