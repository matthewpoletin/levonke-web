const express = require('express');
const router = express.Router();
const config = require("./../config");
const errorHandler = require("./abstractController");
const auth = require("./../auth");
const userService = require("./../backend/userService");

/**
 * Render personal settings page
 */
router.get('/', async (req, res, next) => {
	const userResponse = await auth.getCurrentUser();
	res.render('settings', {
		projectName: config.project.name,
		title: config.project.name,
		user: userResponse,
		pageType: "main"
	});
});

/**
 * Update personal settings
 */
router.post('/', async (req, res, next) => {
	let errors = null;
	// // TODO: add all types of validation
	// req.checkBody('username', 'Username required').notEmpty();
	// req.checkBody('regEmail', 'Email required').notEmpty();
	// req.checkBody('forename', 'Name required').notEmpty();
	// req.checkBody('surname', 'Surname required').notEmpty();
	// errors = req.validationErrors();
	// // TODO: add sanitize
	// // TODO: t&c is checked
	// const username = req.body.username;
	// const email = req.body.regEmail;
	//
	// if (!errors) {
	// 	try {
	// 		const userByUsernameResponse = userService.getUserBy({ username: username });
	// 		if (userByUsernameResponse.username === username) errors.username = "Username already taken";
	// 	} catch (error) {
	// 		console.log("Error: couldn't find user " + username)
	// 	}
	// 	try {
	// 		const userByEmailResponse = userService.getUserBy({ regEmail: email });
	// 		if (userByEmailResponse.email === email) errors.email = "Email already taken";
	// 	} catch (error) {
	// 		console.log("Error: couldn't find user " + email);
	// 	}
	// }
	if (errors) {
		res.body.errors = errors;
		res.redirect('/settings');
		return next(errors);
	} else {
		const userResponse = await auth.getCurrentUser();
		const userId = userResponse.id;
		const userRequest = {
			username: req.body.username,
			regEmail: req.body.regEmail,
		};
		try {
			await userService.updateUserById(userId, userRequest);
			res.redirect('/settings');
		} catch (error) {
			errorHandler(error, req, res, next);
		}
	}
});

/**
 * Render public settings page
 */
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
