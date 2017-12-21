const express = require('express');
const router = express.Router();
const config = require("./../config");
const errorHandler = require("./abstractController");
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	try {
		const componentsResponse = await componentService.getComponents(page, size);
		const manufacturersResponsePromises = [];
		componentsResponse.content.forEach((component) => {
			const manufacturerId = parseInt(component.manufacturerId, 10);
			if (manufacturerId) manufacturersResponsePromises.push(manufacturerService.getManufacturerById(manufacturerId));
		});
		const manufacturersResponse = await Promise.all(manufacturersResponsePromises);
		const manufacturersMap = new Map();
		manufacturersResponse.forEach((manufacturer) => {
			manufacturersMap.set(manufacturer.id, manufacturer)
		});
		res.render('components', {
			projectName: config.project.name,
			title: config.project.name + " | Components",
			components: componentsResponse.content,
			manufacturers: manufacturersMap
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}

});

module.exports = router;
