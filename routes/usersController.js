const express = require('express');
const router = express.Router();
const config = require("./../config.json");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const userService = require("./../backend/userService");

router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name + " | Users",
	};
	const page = req.params.page || 0;
	const size = req.params.size || 25;
	try {
		const usersResponse = await userService.getUsers(req["accessToken"], page, size);
		data.users = usersResponse.content;
		res.render('users', data);
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
