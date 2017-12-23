const express = require('express');
const router = express.Router();
const config = require('./../config');
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

/**
 * Render component info page
 */
router.get('/:uuid', async (req, res, next) => {
	const data = {
		projectName: config.project.name,
		pageType: "main"
	};
	// TODO: add check for valid uuid
	const uuid = req.params.uuid;
	try {
		const componentResponse = await componentService.getComponentByUUID(uuid);
		data.component = componentResponse;
		data.title = config.project.name + " | " + componentResponse.manufacturerPartNumber;
		// TODO: fix loading without manufacturerId set
		if (componentResponse.manufacturerId !== undefined) {
			const manufacturerId = parseInt(componentResponse.manufacturerId, 10);
			try {
				const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
				if (manufacturerResponse) data.manufacturer = manufacturerResponse;
				else data.manufacturer = undefined;
			}
			catch (error) {
				// TODO: log error about that
				console.log("Error");
			}
		} else {
			// TODO: log error about that
			console.log("Error");
		}
	} catch (error) {
		// TODO: log error about that
		console.log("Error");
	}
	res.render('component', data);
});

/**
 * Render component settings page
 */
router.get('/:uuid/settings', async (req, res, next) => {
	const data = {
		projectName: config.project.name,
		pageType: "settings"
	};
	// TODO: add check for valid uuid
	const uuid = req.params.uuid;
	try {
		const componentResponse = await componentService.getComponentByUUID(uuid);
		data.component = componentResponse;
		data.title = config.project.name + " | " + componentResponse.manufacturerPartNumber;
		// TODO: fix loading without manufacturerId set
		if (typeof componentResponse.manufacturerId !== 'undefined') {
			const manufacturerId = parseInt(componentResponse.manufacturerId, 10);
			try {
				const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
				if (manufacturerResponse) data.manufacturer = manufacturerResponse;
				else data.manufacturer = null;
			}
			catch (error) {
				// TODO: log error about that
				console.log("Error");
			}
		} else {
			// TODO: log error about that
			console.log("Error");
		}
	} catch (error) {
		// TODO: log error about that
		console.log("Error");
	}
	res.render('component', data);
});

module.exports = router;
