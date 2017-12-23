"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const userService = require("./../backend/userService");
// const projectService = require("./../backend/projectService");
// const teamService = require("./../backend/projectService");

router.get('/', function(req, res, next) {
	try {
		const user = auth.getCurrentUser();
		// TODO: make api support
		// userService.getProjectsOfUser(user.id);
		res.render('dashboard', {
			projectName: config.project.name,
			title: config.project.name,
			pageType: "main"
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

router.get('/discover', function(req, res, next) {
	try {
		const user = auth.getCurrentUser();
		res.render('dashboard', {
			projectName: config.project.name,
			title: config.project.name,
			pageType: "discover"
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});


module.exports = router;
