const express = require('express');
const router = express.Router();
const config = require("./../config");

router.get('/', function(req, res, next) {
	const isAuth = !!req["accessToken"];
	if (!isAuth) {
		res.render('login', {
			projectName: config.project.name,
			title: config.project.name,
			isAuth: isAuth
		});
	} else {
		res.redirect("/");
	}
});

router.post('/', function (req, res, next) {
	// TODO: check auth and abort if wrong (logout and delete cookie)
	res.redirect("/");
});

module.exports = router;
