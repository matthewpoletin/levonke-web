const express = require('express');
const router = express.Router();
const config = require('./../config');
const manufacturerService = require("./../backend/manufacturerService");
const componentService = require("./../backend/componentService");

router.get('/:id', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
	res.render('manufacturer', {
		pageType: "main",
		projectName: config.project.name,
		title: config.project.name + " | " + manufacturerResponse.name,
		manufacturer: manufacturerResponse
	});
});

router.get('/:id/components', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
	const componentsIdResponse = await manufacturerService.getComponentsOfManufacturer(manufacturerId);
	const componentsResponsePromises = [];
	componentsIdResponse.forEach((componentId) => {
		componentsResponsePromises.push(componentService.getComponentById(componentId));
	});
	const componentsResponse = await Promise.all(componentsResponsePromises);
	res.render('manufacturer', {
		pageType: "components",
		projectName: config.project.name,
		title: config.project.name + " | " + manufacturerResponse.name,
		manufacturer: manufacturerResponse,
		components: componentsResponse
	});
});

router.get('/:id/settings', async (req, res, next) => {
	const manufacturerId = parseInt(req.params.id, 10);
	const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
	res.render('manufacturer', {
		pageType: "settings",
		projectName: config.project.name,
		title: config.project.name + " | " + manufacturerResponse.name,
		manufacturer: manufacturerResponse
	});
});

module.exports = router;
