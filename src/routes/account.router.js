// Important requires
const accountControllers = require("../controllers/account.controller");
const express = require('express');
const router = express.Router();

// Create account route
router.route("/create").post(accountControllers.createUser);

// Login route
router.route("/login").post(accountControllers.login);

module.exports = router;