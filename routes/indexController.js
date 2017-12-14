const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

/**
 * Render index dashboard page
 */
router.get('/', (req, res, next) => {
	const pageType = "main";
	if (!auth.isAuth()) {
		const pageType = "landing";
	}
	res.render('dashboard', {
		projectName: config.project.name,
		title: config.project.name,
		pageType: pageType
	});
});

module.exports = router;
