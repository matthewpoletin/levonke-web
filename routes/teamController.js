const express = require('express');
const router = express.Router();
const config = require('./../config');
const teamService = require("./../backend/teamService");
const organizationService = require('./../backend/organizationService');

router.get('/:id', async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	const teamResponse = await teamService.getTeamById(id);
	const organizationId = parseInt(teamResponse.organizationId, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	const usersResponse = await teamService.getUsersOfTeam(id);
	const projectsResponse = await teamService.getProjectsOfTeam(id);
	res.render('team', {
		projectName: config.project.name,
		title: config.project.name + " | " + teamResponse.name,
		team: teamResponse,
		organization: organizationResponse,
		users: usersResponse,
		projects: projectsResponse
	});
});

module.exports = router;
