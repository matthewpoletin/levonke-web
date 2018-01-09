const express = require('express');
const router = express.Router();
const config = require("./../config");

router.get('/', function(req, res, next) {
	const isAuth = !!req["accessToken"];
	res.render('login', {
		projectName: config.project.name,
		title: config.project.name,
		isAuth: isAuth
	});
});

router.post('/', function (req, res, next) {
	// TODO: check auth and abort if wrong (logout and delete cookie)
	res.redirect("/");
});

module.exports = router;
