"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const componentService = require('./../backend/componentService');
const manufacturerService = require('./../backend/manufacturerService');

router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: config.project.name + " | Components",
	};
	const page = parseInt(req.query.page, 10) || 0;
	const size = parseInt(req.query.size, 10) || 25;
	try {
		const componentsResponse = await componentService.getComponents(req["accessToken"], page, size);
		data.components = componentsResponse.content;
		const manufacturersResponsePromises = [];
		componentsResponse.content.forEach((component) => {
			const manufacturerId = parseInt(component.manufacturerId, 10);
			if (manufacturerId) manufacturersResponsePromises.push(manufacturerService.getManufacturerById(req["accessToken"], manufacturerId));
		});
		const manufacturersResponse = await Promise.all(manufacturersResponsePromises);
		const manufacturersMap = new Map();
		manufacturersResponse.forEach((manufacturer) => {
			manufacturersMap.set(manufacturer.id, manufacturer)
		});
		data.manufacturers = manufacturersMap;
		res.render('components', data);
	} catch (error) {
		errorHandler(error, req, res, next);
	}

});

module.exports = router;
