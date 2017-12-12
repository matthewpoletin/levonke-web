const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require('./../backend/userService');

router.get('/', async (req, res, next) => {
	// TODO: load username from auth
	const username = "matthewpoletin";
	const userResponse = await userService.getUserByUsername(username);
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse
	});
});

module.exports = router;
