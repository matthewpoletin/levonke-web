const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require("./../backend/userService");

router.get('/:username', async (req, res, next) => {
	const username = req.params.username;
	try {
		const userResponse = await userService.getUserBy({username});
		const teams = await userService.getTeams(userResponse.id);
		res.render('user', {
			projectName: config.project.name,
			title: config.project.name + " | " + userResponse.username,
			user: userResponse,
			teams: teams
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
