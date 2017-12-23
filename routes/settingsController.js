const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const userService = require("./../backend/userService");

router.get('/', async (req, res, next) => {
	const userResponse = await auth.getCurrentUser();
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse,
		pageType: "main"
	});
});

router.get('/public', async (req, res, next) => {
	const userResponse = await auth.getCurrentUser();
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse,
		pageType: "public"
	});
});

router.get('/billing', async (req, res, next) => {
	const userResponse = await auth.getCurrentUser();
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse,
		pageType: "billing"
	});
});

router.get('/notifications', async (req, res, next) => {
	const userResponse = await auth.getCurrentUser();
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse,
		pageType: "notifications"
	});
});

module.exports = router;
