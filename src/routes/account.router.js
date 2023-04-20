const accountControllers = require("../controllers/account.controller");
const express = require('express');
const router = express.Router();

router.route("/create").post(accountControllers.createUser);

router.route("/login").post(accountControllers.login);

module.exports = router;