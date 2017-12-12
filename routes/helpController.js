const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function(req, res, next) {
	res.render('help', {
		projectName: config.project.name,
		title: config.project.name + ' | Help'
	});
});

module.exports = router;
