"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const teamService = require("./../backend/teamService");

router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const teamsResponse = await teamService.getTeams(req["accessToken"], page, size);
	res.render('teams', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name + " | Teams",
		teams: teamsResponse,
	});
});

module.exports = router;
