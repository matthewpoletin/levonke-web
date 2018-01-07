const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

router.get('/', function(req, res, next) {
	res.render('login', {
		projectName: config.project.name,
		title: config.project.name
	});
});

module.exports = router;
