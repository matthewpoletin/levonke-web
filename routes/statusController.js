const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function(req, res, next) {
	// TODO: add queering on microservice's statuses
	res.render('status', {
		projectName: config.project.name,
		title: config.project.name + ' | Status'
	});
});

module.exports = router;
