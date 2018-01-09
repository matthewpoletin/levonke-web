const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const userService = require("./../backend/userService");

router.get('/:username', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		title: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
	};
	const username = req.params.username;
	try {
		const userResponse = await userService.getUserBy(req["accessToken"], {username: username});
		data.user = userResponse;
		data.title = config.project.name + " | " + userResponse.username;
		const teams = await userService.getTeams(req["accessToken"], userResponse.id);
		if (teams) data.teams = teams;
		else data.teams = null;
		res.render('user', data);
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
