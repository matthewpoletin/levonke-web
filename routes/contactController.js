"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

router.get('/', async (req, res, next) => {
	const pageName = "Contact";
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	res.render('contact', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: `${config.project.name} | ${pageName}`,
	});
});

module.exports = router;
