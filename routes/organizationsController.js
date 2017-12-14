const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("../auth");
const organizationService = require("./../backend/organizationService");
const userService = require("./../backend/userService");

/**
 * Render list of all organizations
 */
router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const organizationsResponse = await organizationService.getOrganizations(page, size);
	res.render('organizations', {
		projectName: config.project.name,
		title: config.project.name + " | Organizations",
		organizations: organizationsResponse,
		pageType: "main"
	});
});

/**
 * Render create new organization
 */
router.get('/new', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const organizationsResponse = await organizationService.getOrganizations(page, size);
	res.render('organizations', {
		projectName: config.project.name,
		title: config.project.name + " | Organizations",
		organizations: organizationsResponse,
		pageType: "new"
	});
});

/**
 * Create new organization
 */
router.post('/new', async (req, res, next) => {
	// TODO: add all types of validation
	req.checkBody('name', 'Name required').notEmpty();

	// TODO: add sanitize

	const errors = req.validationErrors();
	if (errors) {
		res.redirect('/join');
		return next(errors);
	} else {
		const organizationRequest = {};
		if (req.body.name) organizationRequest.name = req.body.name;
		if (req.body.officialName) organizationRequest.officialName = req.body.officialName;
		if (req.body.description) organizationRequest.description = req.body.description;
		if (req.body.pubEmail) organizationRequest.pubEmail = req.body.pubEmail;
		if (req.body.website) organizationRequest.website = req.body.website;
		try {
			// TODO: get userId from login to set owner

			if (req.body.ownerId) organizationRequest.ownerId = req.body.ownerId;
			else {
				const owner = auth.getCurrentUser();
				organizationRequest.ownerId = owner.id;
			}
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
 * Delete organization
 */
router.post('/:id/delete', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	try {
		const organizationResponse = organizationService.getOrganizationById(organizationId);
		// TODO: check for organization ownership
		if (organizationResponse) {
			organizationService.deleteOrganizationById(organizationId);
			res.redirect("/");
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
