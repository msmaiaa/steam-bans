const jwt = require("jsonwebtoken");

const verify = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err || !decoded){
            return false
        }else{
            return decoded.user;
        }
    })
}

module.exports = verify;