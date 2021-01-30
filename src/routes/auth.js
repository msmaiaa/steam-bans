const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const verify = require("../utils/token");

router.get("/steam", passport.authenticate("steam", { session: false }));

router.get("/steam/return",
    passport.authenticate("steam", { session: false }),
    (req, res) => {
      const token = jwt.sign({ user: req.user._json }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      let user = req.user._json;
      res.render("authenticated", {
        jwtToken: token,
        user: JSON.stringify(user),
        clientUrl: process.env.FRONTEND_URL,
      });
    },
  );

router.get("/steam/token", (req,res)=>{
  const token = req.get('Authorization');
  const decoded = verify(token);
  if(!decoded){
      return res.status(401).json({message: 'Error with authorization token'})
  }
  return res.status(200).json({user: decoded});
})

module.exports = router;