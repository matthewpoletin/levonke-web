const express = require('express');
const router = express.Router();
const config = require('./../config');
const versionService = require("./../backend/versionService");
const manufacturerService = require("./../backend/manufacturerService");

router.get('/:id', async (req, res, next) => {
	const versionId = parseInt(req.params.id, 10);
	const data = {
		projectName: config.project.name,
		title: config.project.name
	};
	try {
		const versionResponse = await versionService.getVersionById(versionId);
		if (versionResponse) {
			data.version = versionResponse;
			data.title = config.project.name + " | Version " + versionResponse.major;
		} else data.version = null;
		const componentsResponse = await versionService.getComponentsOfVersion(versionId);
		if (componentsResponse) data.components = componentsResponse;
		else data.components = null;

		data.serviceOnline = true;
		componentsResponse.forEach((component) => {
			if (!component.manufacturerPartNumber) {
				component.manufacturerPartNumber = (Math.random() + 1).toString(26).substring(2, 10);
				data.serviceOnline = false;
			}
		});

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
		data.manufacturers = manufacturersMap;
	} catch (error) {
		console.log(error);
	}
	res.render('version', data);
});

module.exports = router;
