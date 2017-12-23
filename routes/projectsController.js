const express = require('express');
const router = express.Router();
const config = require('./../config');
const auth = require("./../auth");
const projectService = require("./../backend/projectService");

/**
 *
 */
router.get('/new', async (req, res, next) => {
	const data = {
		projectName: config.project.name,
		title: config.project.name,
		pageType: "new",
	};
	res.render('projects', data);
});

module.exports = router;
