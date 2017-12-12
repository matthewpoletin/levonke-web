const express = require('express');
const router = express.Router();
const config = require('./../config');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/', async (req, res, next) => {
	const page = req.query.page || 0;
	const size = req.query.size || 25;
	const manufacturersResponse = await manufacturerService.getManufacturers(page, size);
	res.render('manufacturers', {
		projectName: config.project.name,
		title: config.project.name + " | Manufacturers",
		manufacturers: manufacturersResponse
	});
});

module.exports = router;
