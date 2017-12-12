const express = require('express');
const router = express.Router();
const config = require('./../config');
const organizationService = require('./../backend/organizationService');
const userService = require('./../backend/userService');

router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const organizationsResponse = await organizationService.getOrganizations(page, size);
	res.render('organizations', {
		projectName: config.project.name,
		title: config.project.name + " | Organizations",
		organizations: organizationsResponse
	});
});

router.get('/new', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const organizationsResponse = await organizationService.getOrganizations(page, size);
	res.render('organizations', {
		projectName: config.project.name,
		title: config.project.name + " | Organizations",
		organizations: organizationsResponse
	});
});

module.exports = router;
