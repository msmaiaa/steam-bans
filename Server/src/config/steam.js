const passport = require("passport");
const { Strategy } = require("passport-steam");

const strategyOptions = {
  returnURL: `${process.env.BASE_URL}/auth/steam/return`,
  realm: `${process.env.BASE_URL}/`,
  apiKey: process.env.STEAM_API_KEY,
};


module.exports = app => {
  passport.use(
    new Strategy(strategyOptions, async (identifier, profile, done) => {
      return done(null, profile);
    }),
  );

  app.use(passport.initialize());
};
