const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");

const router = express.Router();

// Normal Logging in and Registering
router.use(registerApi);
router.use(loginApi);

// Logging in with Google API
router.use(loginWithGoogleApi);

// Check whether the use is authenticated or not
router.use(userApi);

module.exports = router;
