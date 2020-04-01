const jwt = require('jsonwebtoken')
module.exports = (req, res,next )=> {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
        if(!token || token ===''){
            req.isAuth = false
            return next()
        }
        let decotedToken;
        try{
        decotedToken = jwt.verify(token, 'secretkey')
        }
        catch (err){
            req.isAuth = false
            return next()
        }
        if(!decotedToken){
            req.isAuth = false
            return next()
        }
            req.isAuth = true
            req.userId = decotedToken.userId
            next()
}