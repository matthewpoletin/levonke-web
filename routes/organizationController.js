const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const organizationService = require("./../backend/organizationService");
const userService = require("./../backend/userService");
const teamService = require("./../backend/teamService");

/**
 * Render organization main page
 */
router.get('/:id', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
	const ownerId = parseInt(organizationResponse.ownerId, 10);
	let ownerResponse = null;
	if (ownerId) ownerResponse = await userService.getUserById(req["accessToken"], ownerId);
	res.render('organization', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
	const ownerId = parseInt(organizationResponse.ownerId, 10);
	let ownerResponse = null;
	if (ownerId) ownerResponse = await userService.getUserById(req["accessToken"], ownerId);
	const teamsResponse = await organizationService.getTeamsOfOrganization(req["accessToken"], organizationId, null, null);
	res.render('organization', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: `${config.project.name} | ${organizationResponse.name}`,
		pageType: "teams",
		organization: organizationResponse,
		owner: ownerResponse,
		teams: teamsResponse.content,
	});
});

/**
 * Render create new team of organization page
 */
router.get('/:id/teams/new', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
	res.render('organization', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name + " | " + organizationResponse.name,
		pageType: "teams-new",
		organization: organizationResponse,
	});
});

/**
 * Create new team of organization
 */
router.post('/:id/teams/new', async (req, res, next) => {
	const validationErrors = [];

	const organizationId = parseInt(req.params.id, 10);
	try {
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
	} catch (error) {
		errorHandler(error, req, res, next);
	}
	req.checkBody('name', 'Name required').notEmpty();
	validationErrors.push.apply(validationErrors, req.validationErrors());
	// TODO: add sanitize

	const newTeamName = req.body.name;
	try {
		await teamService.getTeamBy(newTeamName);
	} catch (error) {
		validationErrors.push({
			location: "body",
			param: "name",
			msg: "Name is already taken",
			value: ""
		});
	}
	if (validationErrors) {
		res.redirect(`organization/${organizationId}/teams/new`);
		// return next(validationErrors);
	} else {
		const teamRequest = {};
		if (req.body.name) teamRequest.name = req.body.name;
		if (req.body.description) teamRequest.description = req.body.description;
		try {
			const ownerResponse = auth.getCurrentUser();
			if (ownerResponse) teamRequest.ownerId = ownerResponse.id;
			try {
				const teamResponse = await teamService.createTeam(req["accessToken"], teamRequest);
				res.redirect(`/team/${teamResponse.id}/teams`);
			} catch (error) {
				errorHandler(error, req, res, next);
			}
		} catch (error) {
			errorHandler(error, req, res, next);
		}
	}
});

/**
 * Render organization settings page
 */
router.get('/:id/settings', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const organizationId = parseInt(req.params.id, 10);
	const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
	res.render('organization', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: `${config.project.name} | ${organizationResponse.name}`,
		pageType: "settings",
		organization: organizationResponse,
	});
});

module.exports = router;
