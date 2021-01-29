const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/steam", passport.authenticate("steam", { session: false }));

router.get("/steam/return",
    passport.authenticate("steam", { session: false }),
    (req, res) => {
      const token = jwt.sign({ user: req.user._json }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      let user = req.user._json;
      res.render("authenticated", {
        jwtToken: token,
        user: JSON.stringify(user),
        clientUrl: process.env.FRONTEND_URL,
      });
    },
  );

module.exports = router;