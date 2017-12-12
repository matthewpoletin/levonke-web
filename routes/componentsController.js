const express = require('express');
const router = express.Router();
const config = require('./../config');
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	const componentsResponse = await componentService.getComponents(page, size);
	const manudacturersResponsePromises = [];
	componentsResponse.forEach((component) => {
		const manufacturerId = parseInt(component.manufacturerId, 10);
		if (manufacturerId) manudacturersResponsePromises.push(manufacturerService.getManufacturerById(manufacturerId));
	});
	const manufacturersResponse = await Promise.all(manudacturersResponsePromises);
	const manufacturersMap = new Map();
	manufacturersResponse.forEach((manufacturer) => {
		manufacturersMap.set(manufacturer.id, manufacturer)
	});
	res.render('components', {
		projectName: config.project.name,
		title: config.project.name + " | Components",
		components: componentsResponse,
		manufacturers: manufacturersMap
	});
});

module.exports = router;
