const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/user");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    function (req, jwtPayload, done) {
      console.log(req)
      return User.findOne({ where: { googleId: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          console.log("or am i here?")
          return done(err);
        });

    }

  )
);
