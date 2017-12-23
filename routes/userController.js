const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require("./../backend/userService");

router.get('/:username', async (req, res, next) => {
	const data = {
		projectName: config.project.name,
		title: config.project.name
	};
	const username = req.params.username;
	try {
		const userResponse = await userService.getUserBy({username});
		if (userResponse) {
			const teams = await userService.getTeams(userResponse.id);
			data.title = config.project.name + " | " + userResponse.username;
			data.user = userResponse;
			data.teams = teams;
			res.render('user', data);
		} else {
			const info = `User ${username} not found`;
			data.title = `${config.project.name} | 404`;
			data.message = info;
			data.error = {
				status: "404",
				stack: ""
			};
			res.render('error', data);
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
