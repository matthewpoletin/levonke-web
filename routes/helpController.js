"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

router.get('/', async (req, res, next) =>  {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const pageName = "Help";
	res.render('help', {
		projectName: config.project.name,
		title: `${config.project.name} | ${pageName}`,
		isAuth: isAuth,
		authUser: authUser,
	});
});

module.exports = router;
