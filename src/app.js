require("dotenv").config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('COOKIE_KEY:', process.env.COOKIE_KEY);

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

require("./auth/passport");
require("./auth/passportGoogleSSO");

const middlewares = require("./middlewares");
const api = require("./api");
const passport = require("passport");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "Hello! This is the root API Endpoint",
  });
});

app.use("/api/v1", api);

app.get(
  "/payment",
  passport.authenticate("jwt", { session: false, failWithError: true}),
  (req, res) => {
    res.send({"msg": "This is the protected message inside the payments endpoint"});
  },

);

// function passport_authenticate_jwt(callback) {
// 	function hack(req, res, next) {
// 		passport.authenticate('jwt', function(err, user, info) {
// 			if (err) return next(err)
// 			if (!user) return res.status(401).send({
// 				error: "Unauthorized"
// 			});

// 			req.user = user
// 			return callback(req, res, next);
// 		})(req, res, next);
// 	}

// 	return hack
// }

// app.get('/payment',
//   passport_authenticate_jwt(function(req, res, next) {
// 	  req.send({"protected": "resource"})
//   })

// );

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
