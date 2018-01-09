const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const componentService = require("./../backend/componentService");
const manufacturerService = require("./../backend/manufacturerService");

/**
 * Render component info page
 */
router.get('/:uuid', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		pageType: "main",
	};
	// TODO: add check for valid uuid
	const uuid = req.params.uuid;
	try {
		const componentResponse = await componentService.getComponentByUUID(req["accessToken"], uuid);
		data.component = componentResponse;
		data.title = `${config.project.name} | ${componentResponse.manufacturerPartNumber}`;
		// TODO: fix loading without manufacturerId set
		if (componentResponse.manufacturerId !== undefined) {
			const manufacturerId = parseInt(componentResponse.manufacturerId, 10);
			try {
				const manufacturerResponse = await manufacturerService.getManufacturerById(req["accessToken"], manufacturerId);
				if (manufacturerResponse) data.manufacturer = manufacturerResponse;
				else data.manufacturer = undefined;
				res.render('component', data);
			}
			catch (error) {
				errorHandler(error, req, res, next);
			}
		} else {
			errorHandler(error, req, res, next);
		}
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 * Render component settings page
 */
router.get('/:uuid/settings', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		pageType: "settings",
	};
	// TODO: add check for valid uuid
	const uuid = req.params.uuid;
	try {
		const componentResponse = await componentService.getComponentByUUID(req["accessToken"], uuid);
		data.component = componentResponse;
		data.title = config.project.name + " | " + componentResponse.manufacturerPartNumber;
		// TODO: fix loading without manufacturerId set
		if (typeof componentResponse.manufacturerId !== 'undefined') {
			const manufacturerId = parseInt(componentResponse.manufacturerId, 10);
			try {
				const manufacturerResponse = await manufacturerService.getManufacturerById(req["accessToken"], manufacturerId);
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
