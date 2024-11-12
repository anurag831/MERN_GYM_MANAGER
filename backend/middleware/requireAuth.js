const jwt = require('jsonwebtoken')
const user = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers
    // this authorization property of the headers is of the following format
    // 'Bearer cbsdkucbwbo.1224svlbvi.sbvfipwbbahdbwuob' 
    // the first part is the bearer and the second part is the jwt

    if(!authorization){
        return res.status(401).json({'error':'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        // verifying if the token has been tempered or not
        const { _id } = jwt.verify(token, process.env.SECRET)    // the jwt.verify function returns the payload which in our case is   { _id : _id }

        req.user = await user.findOne({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
    
}

module.exports = requireAuth