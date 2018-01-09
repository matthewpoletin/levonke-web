const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const authService = require("./../backend/authService");

router.get('/', function(req, res, next) {
	const isAuth = !!req["accessToken"];
	res.clearCookie("Access-Token");
	authService.logout();
	res.redirect('/');
});

module.exports = router;
