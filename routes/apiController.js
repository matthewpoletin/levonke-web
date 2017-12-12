const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function(req, res, next) {
	res.render('api', {
		projectName: config.project.name,
		title: config.project.name + ' | API'
	});
});

module.exports = router;
