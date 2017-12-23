const express = require('express');
const router = express.Router();
const config = require("./../config");
const errorHandler = require("./abstractController");
const manufacturerService = require("./../backend/manufacturerService");

/**
 *
 */
router.get('/:id', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
		res.render('manufacturer', {
			pageType: "main",
			projectName: config.project.name,
			title: config.project.name + " | " + manufacturerResponse.name,
			manufacturer: manufacturerResponse
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 *
 */
router.get('/:id/components', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
		const componentsResponse = await manufacturerService.getComponentsOfManufacturer(manufacturerId);
		res.render('manufacturer', {
			pageType: "components",
			projectName: config.project.name,
			title: config.project.name + " | " + manufacturerResponse.name,
			manufacturer: manufacturerResponse,
			components: componentsResponse.content
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 *
 */
router.get('/:id/settings', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
		res.render('manufacturer', {
			pageType: "settings",
			projectName: config.project.name,
			title: config.project.name + " | " + manufacturerResponse.name,
			manufacturer: manufacturerResponse
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
