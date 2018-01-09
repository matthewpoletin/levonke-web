"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const manufacturerService = require("./../backend/manufacturerService");

/**
 *
 */
router.get('/:id', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(req["accessToken"], manufacturerId);
		res.render('manufacturer', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name + " | " + manufacturerResponse.name,
			pageType: "main",
			manufacturer: manufacturerResponse,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 *
 */
router.get('/:id/components', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(req["accessToken"], manufacturerId);
		const componentsResponse = await manufacturerService.getComponentsOfManufacturer(req["accessToken"], manufacturerId);
		res.render('manufacturer', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name + " | " + manufacturerResponse.name,
			pageType: "components",
			manufacturer: manufacturerResponse,
			components: componentsResponse.content,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

/**
 *
 */
router.get('/:id/settings', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const manufacturerId = parseInt(req.params.id, 10);
	try {
		const manufacturerResponse = await manufacturerService.getManufacturerById(req["accessToken"], manufacturerId);
		res.render('manufacturer', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name + " | " + manufacturerResponse.name,
			pageType: "settings",
			manufacturer: manufacturerResponse,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
