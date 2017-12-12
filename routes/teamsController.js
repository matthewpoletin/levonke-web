const express = require('express');
const router = express.Router();
const config = require('./../config');
const teamService = require('./../backend/teamService');

router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const teamsResponse = await teamService.getTeams(page, size);
	res.render('teams', {
		projectName: config.project.name,
		title: config.project.name + " | Teams",
		teams: teamsResponse
	});
});

module.exports = router;
