const express = require('express');
const router = express.Router();
const config = require('./../config.json');
const userService = require("./../backend/userService");

router.get('/', async (req, res, next) => {
	const page = req.params.page || 0;
	const size = req.params.size || 25;
	const usersResponse = await userService.getUsers(page, size);
	res.render('users', {
		projectName: config.project.name,
		title: config.project.name + " | Users",
		users: usersResponse
	});
});

module.exports = router;
