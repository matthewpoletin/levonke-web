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
		user: userResponse
	});
});

module.exports = router;
