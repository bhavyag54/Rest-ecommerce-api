const User = require("../models/user")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.register = (req, res) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            Error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.status(200).json({
            message: "Success"  
        })
    }
    )

}


exports.login = (req, res) => {
    const {email, password, role} = req.body

    User.findOne({email}, (err, user) => {

        if(!user)
            return res.status(400).json({
                error: "Invalid Credentials 1"
            })
        
        if(!user.authenticate(password))
        {
            return res.status(400).json({
                error: "Invalid Credentials 2"
            })
        }

        if(user.role === 1 && user.role !== role)
        {
            return res.status(400).json({
                error: "You Don't have seller access"
            })
        }

        // Create jwt token
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.SECRET)


        // make cookie
        res.cookie('token', token, {expire: new Date() + 1})

        const {_id, name, email} = user

        return res.status(200).json({
            message: "success",
            token,
            user: {
                _id,
                name,
                email
            }
        })


    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: "success"
    })
}

exports.verifyToken = async (req, res, next) => {
    let token =  req.headers['cookie']

    if(typeof token !== 'undefined')
    {
        const bearer = token.split('=');
        req.token = bearer[1];

        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            
            if(err)
            {
                return res.status(400).json({
                    message: "Not Authorized"
                })
            }
            else
            {
                req.authData = authData;
                next()
            }
        })

    }
    else
    {
        return res.status(400).json({
            message: "Not Authorized"
        })
    }


}

exports.verifyRole = (req, res, next) => {

    if(req.authData.role === 1 && req.authData.role !== req.role)
    {
        return res.status(403).json({
            error: "You don't have seller access"
        })
    }
    else
        next()

}

exports.genarateNewToken = async (req, res) => {

    const {_id, email, role} = req.authData

    token = jwt.sign({
        _id: _id,
        email: email,
        role: role,
    }, process.env.SECRET)
    
    const user = await User.findOne({_id});
    res.cookie('token', token, {expire: new Date() + 1})

    return res.status(200).json({
        message: "success",
        token,
        user: {
            _id,
            name: user.name,
            email
        }
    })

}   