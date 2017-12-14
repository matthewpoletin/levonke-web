const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const organizationService = require("./../backend/organizationService");
const userService = require("./../backend/userService");
const teamService = require("./../backend/teamService");
/**
 * Render organization main page
 */
router.get('/:id', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	const ownerId = parseInt(organizationResponse.ownerId, 10);
	let ownerResponse = null;
	if (ownerId) ownerResponse = await userService.getUserById(ownerId);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "main",
		organization: organizationResponse,
		owner: ownerResponse,
	});
});

/**
 * Render all teams of organization
 */
router.get('/:id/teams', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	const ownerId = parseInt(organizationResponse.ownerId, 10);
	let ownerResponse = null;
	if (ownerId) ownerResponse = await userService.getUserById(ownerId);
	const teamsResponse = await organizationService.getTeamsOfOrganization(organizationId, null, null);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "teams",
		organization: organizationResponse,
		owner: ownerResponse,
		teams: teamsResponse
	});
});

/**
 * Render create new team of organization page
 */
router.get('/:id/teams/new', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	res.render('organization', {
		projectName: config.project.name,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "teams-new",
		organization: organizationResponse,
	});
});

/**
 * Create new team of organization
 */
router.post('/:id/teams/new', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(organizationId);
	// TODO: add all types of validation
	req.checkBody('name', 'Name required').notEmpty();

	// TODO: add sanitize

	// TODO: check if team with this name exists
	const newTeamName = req.body.name;
	const teamRequest = await teamService.getTeamByName(newTeamName);

	const errors = req.validationErrors();
	if (errors) {
		res.redirect('/req.');
		return next(errors);
	} else {
		const organizationRequest = {};
		if (req.body.name) organizationRequest.name = req.body.name;
		if (req.body.description) organizationRequest.description = req.body.description;
		if (req.body.pubEmail) organizationRequest.pubEmail = req.body.pubEmail;
		if (req.body.website) organizationRequest.website = req.body.website;
		try {
			const ownerResponse = auth.getCurrentUser();
			if (ownerResponse) organizationRequest.ownerId = ownerResponse.id;
			const organizationResponse = await organizationService.createOrganization(organizationRequest);
			res.redirect('/organization/' + organizationResponse.id);
		} catch (error) {
			// TODO: move to separate function
			res.locals.message = error.message;
			res.locals.error = req.app.get('env') === 'development' ? error : {};

			const statusCode = error.statusCode;
			res.status(statusCode || 500);
			res.render('error', {
				projectName: config.project.name,
				title: statusCode,
				message: error.message
			});
		}
	}
});

/**
 * Render organization settings page
 */
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
