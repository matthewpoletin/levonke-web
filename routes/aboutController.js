const express = require('express');
const router = express.Router();
const config = require('./../config');

/**
 * Render about page
 */
router.get('/', (req, res, next) => {
	res.render('about', {
		projectName: config.project.name,
		title: config.project.name + ' | About'
	});
});

module.exports = router;
