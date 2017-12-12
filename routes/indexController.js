const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function(req, res, next) {
	res.render('index', {
		projectName: config.project.name,
		title: config.project.name
	});
});

module.exports = router;