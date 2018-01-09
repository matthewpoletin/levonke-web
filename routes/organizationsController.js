"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("../auth");
const errorHandler = require("./abstractController");
const organizationService = require("./../backend/organizationService");
const userService = require("./../backend/userService");

/**
 * Render list of all organizations
 */
router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	try {
		const organizationsResponse = await organizationService.getOrganizations(req["accessToken"], page, size);
		res.render('organizations', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name + " | Organizations",
			organizations: organizationsResponse.content,
			pageType: "main",
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 * Render create new organization
 */
router.get('/new', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const organizationsResponse = await organizationService.getOrganizations(req["accessToken"], page, size);
	res.render('organizations', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name + " | Organizations",
		organizations: organizationsResponse,
		pageType: "new",
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
			const organizationResponse = await organizationService.createOrganization(req["accessToken"], organizationRequest);
			res.redirect('/organization/' + organizationResponse.id);

		} catch (error) {
			errorHandler(error, req, res, next);
		}
	}
});

/**
 * Delete organization
 */
router.post('/:id/delete', async (req, res, next) => {
	const organizationId = parseInt(req.params.id, 10);
	try {
		const organizationResponse = organizationService.getOrganizationById(req["accessToken"], organizationId);
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
