"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

/**
 * Render index dashboard page
 */
//TODO: match index and dashboard controllers
router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name,
		pageType: "main",
	};
	res.render('dashboard', data);
});

module.exports = router;
