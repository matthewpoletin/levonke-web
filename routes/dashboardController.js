"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");

router.get('/',	async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name,
		pageType: "main",
	};
	try {
		// TODO: make api support
		// userService.getProjectsOfUser(user.id);
		res.render('dashboard', data);
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

router.get('/discover', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	try {
		const user = auth.getCurrentUser();
		res.render('dashboard', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name,
			pageType: "discover"
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});


module.exports = router;
