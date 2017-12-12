const express = require('express');
const router = express.Router();
const config = require('./../config');
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/:uuid', async (req, res, next) => {
	const data = {
		projectName: config.project.name,
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
			const manufacturerResponse = await manufacturerService.getManufacturerById(manufacturerId);
			data.manufacturer = manufacturerResponse;
		} else {
			data.manufacturer = undefined;
			// TODO: log error about that
		}
	} catch (error) {
		console.log("Error");
	}
	res.render('component', data);
});

module.exports = router;
