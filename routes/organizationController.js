const express = require('express');
const router = express.Router();
const config = require('./../config');
const organizationService = require('./../backend/organizationService');
const userService = require('./../backend/userService');

router.get('/:id', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	const ownerResponse = await userService.getUserById(organizationResponse.ownerId);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "main",
		organization: organizationResponse,
		owner: ownerResponse,
	});
});

router.get('/:id/teams', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	const ownerId = parseInt(organizationResponse.ownerId, 10);
	const userResponse = await userService.getUserById(ownerId);
	const teamsResponse = await organizationService.getTeamsOfOrganization(organizationId, null, null);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "teams",
		organization: organizationResponse,
		owner: userResponse,
		teams: teamsResponse
	});
});


router.get('/:id/settings', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "settings",
		organization: organizationResponse,
	});
});

module.exports = router;
