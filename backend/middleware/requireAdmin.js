const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

const requireAdmin = async (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization){
        res.status(401).json({'error' : 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const { _id } = jwt.verify(token, process.env.SECRET)

        const user = await User.findOne({_id})

        if(user.role === 'admin') {
            console.log(user.role)
            console.log("Middleware passed")
            next()
        }
        
        
    } catch(error) {
        console.log("Middleware not passed")
        res.status(401).json({error:"Request is not made by admin"})
    }

}

module.exports = requireAdmin