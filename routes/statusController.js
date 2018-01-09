const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const pageName = "Status";
	// TODO: add queering on microservice's statuses
	res.render('status', {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: `${config.project.name} | ${pageName}`,
	});
});

module.exports = router;
