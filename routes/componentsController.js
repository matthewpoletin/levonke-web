const express = require('express');
const router = express.Router();
const config = require('./../config');
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/', async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	try {
		const componentsResponse = await componentService.getComponents(page, size);
		const manufacturersResponsePromises = [];
		componentsResponse.forEach((component) => {
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
			components: componentsResponse,
			manufacturers: manufacturersMap
		});
	} catch (error) {
		// TODO: move to separate function
		res.locals.message = error.message;
		res.locals.error = req.app.get('env') === 'development' ? error : {};

		const statusCode = error.statusCode;
		res.status(statusCode || 500);
		res.render('error', {
			projectName: config.project.name,
			title: statusCode,
			message: error.message
		});
	}

});

module.exports = router;
