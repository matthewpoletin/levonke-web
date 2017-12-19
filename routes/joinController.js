const express = require('express');
const router = express.Router();
const config = require("./../config");
const errorHandler = require("./abstractController");
const auth = require("./../auth");
const userService = require("./../backend/userService");

/**
 * Render join page
 */
router.get('/', (req, res, next) => {
	res.render('join', {
		projectName: config.project.name,
		title: config.project.name + " | Join",
		pageType: "main"
	});
});

/**
 * Create new user
 */
router.post('/', async (req, res, next) => {
	let errors = null;
	// TODO: add all types of validation
	req.checkBody('username', 'Name required').notEmpty();
	req.checkBody('email', 'Email required').notEmpty();
	req.checkBody('password', 'Password required').notEmpty();
	errors = req.validationErrors();
	// TODO: add sanitize
	// TODO: t&c is checked
	// req.checkBody('cbInput', 'Accept').isChecked();
	const username = req.body.username;
	if (!errors) {
		try {
			const userByUsernameResponse = userService.getUserBy(username);
			if (userByUsernameResponse.username === username) errors.username = "Username already taken";
		} catch (error) {
			console.log("Error: couldn't find user " + username)
		}

		const email = req.body.email;
		try {
			const userByEmailResponse = userService.getUserByEmail(email);
			if (userByEmailResponse.email === email) errors.email = "Email already taken";
		} catch (error) {
			console.log("Error: couldn't find user " + email)
		}
	}
	if (errors) {
		res.body.errors = errors;
		res.redirect('/join');
		return next(errors);
	} else {
		const userRequest = {
			username: req.body.username,
			regEmail: req.body.email,
			password: req.body.password
		};
		try {
			const userResponse = await userService.createUser(userRequest);
			auth.setCurrentUser(userResponse);
			res.redirect('/join/info')
		} catch (error) {
			errorHandler(error, req, res, next);
		}
	}
});

/**
 *
 */
router.get('/info', function(req, res, next) {
	res.render('join', {
		projectName: config.project.name,
		title: config.project.name + " | Info",
		pageType: "info",
	});
});

/**
 * Set user info
 */
router.post('/info', async (req, res, next) => {
	// TODO: add all types of validation
	// req.checkBody('username', 'Name required').notEmpty();
	// req.checkBody('email', 'Email required').notEmpty();
	// req.checkBody('password', 'Password required').notEmpty();

	// TODO: add sanitize

	const errors = req.validationErrors();
	if (errors) {
		res.redirect('/join');
		return next(errors);
	} else {
		const userRequest = {};
		if (req.body.forename) userRequest.forename = req.body.forename;
		if (req.body.surname) userRequest.surname = req.body.surname;
		if (req.body.pubEmail) userRequest.pubEmail = req.body.pubEmail;
		if (req.body.ghLink) userRequest.ghLink = req.body.ghLink;
		if (req.body.fbLink) userRequest.fbLink = req.body.fbLink;
		try {
			// TODO: get userId from login
			const userId = parseInt('1', 10);
			if (!userId) {
				// TODO: log that user is not found
				console.log("Error: user not found");
			}
			else {
				const userResponse = await userService.updateUserById(userId, userRequest);
			}
			auth.setCurrentUser(userResponse);
			// TODO: set auth info to user
			res.redirect('/join/info')
		} catch (error) {
			errorHandler(error, req, res, next);
		}
	}
});

/**
 * Render user set personalization page
 */
router.get('/personalize', function(req, res, next) {
	res.render('join', {
		projectName: config.project.name,
		title: config.project.name + " | Personalize",
		pageType: "personalize",
	});
});

/**
 *
 */
router.post('/personalize', function (req, res, next) {

});

module.exports = router;
