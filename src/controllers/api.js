const User = require('../models/UserModel');
const ObservedUser = require('../models/ObservedUserModel');
const jwt = require("jsonwebtoken");
const steam = require("../utils/steam");

module.exports = {
    createUser: async (req,res) =>{
        const token = req.get('Authorization');
        const decoded = verify(token);
        if(!decoded){
            return res.status(401).json({message: 'Error with authorization token'})
        }
        const hasUser = await User.findOne({steamid: decoded.steamid});
        if(hasUser) return res.status(300).json({message:'User already exists'});
            
        const newUser = new User({
            steamid: decoded.steamid,
            email: ''
        })
        await newUser.save();
        return res.status(200).json({message:'User created successfully'});
    },
    createObservedUser: async(req,res) =>{
        const token = req.get('Authorization');
        const decoded = verify(token);
        if(!decoded){
            return res.status(401).json({message: 'Error with authorization token'})
        }
        const hasObsUser = await ObservedUser.findOne({observerId: decoded.steamid, steamid: req.body.steamid})
        if (hasObsUser) return res.status(300).json({message:'Already observing the given steamid'});

        const newObsUser = new ObservedUser({
            observerId: decoded.steamid,
            steamid: req.body.steamid
        })
        newObsUser.save((err,doc)=>{
            if (err) return res.status(404).json({message:'Error while trying to create a new observed user'})
            return res.status(200).json({message:'Observed user created successfully'});
        });
        
    },
    getObservedUsersList: async (req,res) =>{
        const token = req.get('Authorization');
        const decoded = verify(token);

        if(!decoded){
            return res.status(401).json({message: 'Error with authorization token'})
        }
        const docs = await ObservedUser.find({observerId: decoded.steamid})
        if(!docs){
            return res.status(404).json({message: 'Error fetching observed users list'});
        }
        const profiles = await steam.fetchProfiles(docs);
        return res.status(200).json({message: 'Observed users fetched successfully', docs: profiles});
    },
    changeEmail: async (req,res) =>{
        const token = req.get('Authorization')
        const decoded = verify(token);
        if(!decoded){
            return res.status(401).json({message: 'Error with authorization token'})
        }
        const query = {steamid: decoded.steamid};
        const newEmail = req.body.email;
        //need to add email check
        User.findOneAndUpdate(query, {email: newEmail}, null, (err, doc)=>{
            if(err){
                return res.status(404).json({message: 'Error while trying to change email'});
            }
            return res.status(200).json({message:'Email changed successfully'});
        })
    }
}

const verify = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err || !decoded){
            return false
        }else{
            return decoded.user;
        }
    })
}