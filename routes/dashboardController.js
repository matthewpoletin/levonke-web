const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function(req, res, next) {
	res.render('dashboard', {
		projectName: config.project.name,
		title: config.project.name,
		pageType: "main"
	});
});

router.get('/discover', function(req, res, next) {
	res.render('dashboard', {
		projectName: config.project.name,
		title: config.project.name,
		pageType: "discover"
	});
});


module.exports = router;
