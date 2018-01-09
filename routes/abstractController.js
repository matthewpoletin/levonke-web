"use strict";

const config = require("./../config.json");

function errorHandler(error, req, res, next) {
	const isAuth = !!req["accessToken"];

	res.locals.message = error.message;
	res.locals.error = req.app.get('env') === 'development' ? error : {};

	const statusCode = error.statusCode;
	res.status(statusCode || 500);
	res.render('error', {
		projectName: config.project.name,
		isAuth: isAuth,
		title: statusCode,
		message: error.message,
	});

}

module.exports = errorHandler;
