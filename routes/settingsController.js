"use strict";

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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	try {
		res.render('settings', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name,
			pageType: "main",
			user: authUser,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
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
	// 		const userByUsernameResponse = userService.getUserBy(req["accessToken"], { username: username });
	// 		if (userByUsernameResponse.username === username) errors.username = "Username already taken";
	// 	} catch (error) {
	// 		console.log("Error: couldn't find user " + username)
	// 	}
	// 	try {
	// 		const userByEmailResponse = userService.getUserBy(req["accessToken"], { regEmail: email });
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
			await userService.updateUserById(req["accessToken"], userId, userRequest);
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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	try {
		// const userResponse = await auth.getCurrentUser();
		res.render('settings', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name,
			pageType: "public",
			user: authUser,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

router.get('/billing', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	try {
		res.render('settings', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name,
			pageType: "billing",
			user: authUser,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

router.get('/notifications', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	try {
		res.render('settings', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name,
			pageType: "notifications",
			user: authUser,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
