"use strict";

const express = require('express');
const router = express.Router();
const config = require('./../config');
const auth = require("./../auth");
const projectService = require("./../backend/projectService");

/**
 *
 */
router.get('/new', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name,
		pageType: "new",
	};
	res.render('projects', data);
});

module.exports = router;
