const express = require("express");
const passport = require("passport");

const router = express.Router();

// router.get(
//   "/payment",
//   passport.authenticate("jwt", {session: false}),
//   (req, res) => {
//     res.send("You have a total of: 2400$");
//   },
//   function(err, req, res, next) {
//     // handle error
//     console.log("hi im here")
//     if (req.xhr) { return res.json(err); }
//     return res.redirect('/login');
//   }
// );

function passport_authenticate_jwt(callback) {
	function hack(req, res, next) {
		passport.authenticate('jwt', function(err, user, info) {
			if (err) return next(err)
			if (!user) return res.status(401).send({
				"error": {
					"code": "INVALID_AUTHORIZATION_CODE",
					"message": "Invalid authorization code"
				}
			});

			req.user = user
			return callback(req, res, next);
		})(req, res, next);
	}

	return hack
}

router.get('/payment', passport_authenticate_jwt(function(req, res, next) {
	req.send({"protected": "resource"})
}));

module.exports = router;
