const jwt = require("jsonwebtoken");


module.exports = {
    check_token: (req,res,next)=>{
        const token = req.get('Authorization');

        if(!token){
            return res.status(401).json({message: 'Token not found'});
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if (err || !decoded){
                return res.status(401).json({message: 'Wrong Token: Authentication error.'})
            }
        })
        next();
    },
}