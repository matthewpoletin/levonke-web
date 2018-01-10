"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const errorHandler = require("./abstractController");
const authService = require("./../backend/authService");

/**
 * Render about page
 */
router.get('/authorize', async (req, res, next) => {
	const appId = parseInt(req.query.client_id, 10) || 0;
	try {
		const appResponse = await authService.getApp(appId);
		const redirectUri = req.query.redirect_uri;
		res.render('oauth', {
			projectName: config.project.name,
			title: `${config.project.name} | Oauth`,
			appName: appResponse.name,
			redirectUri: redirectUri,
			appId: appId,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

router.post('/authorize', async (req, res, next) => {
	const appId = parseInt(req.body.appId, 10) || 0;
	const username = req.body.username;
	const password = req.body.password;
	const redirectUri = req.body.redirectUri;
	const oauthLoginRequest = {
		appId: appId,
		username: username,
		password: password,
		redirectUrl: redirectUri,
	};
	try {
		const response = await authService.oauthLogin(oauthLoginRequest);
		console.log(response);
		res.redirect(`https://${redirectUri}?code=${response.code}`);
	} catch (error) {
		res.redirect(`/`);
	}

});

module.exports = router;
