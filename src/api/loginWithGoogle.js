const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    // successRedirect: successLoginUrl,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.googleId }, process.env.JWT_SECRET);
    req.session.accessToken = token
    
    res.json(token)
  }
);

module.exports = router;
