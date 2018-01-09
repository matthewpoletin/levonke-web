const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const manufacturerService = require("./../backend/manufacturerService");

router.get('/', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const pageName = "Manufacturers";
	const data = {
		projectName: config.project.name,
		isAuth: isAuth,
		authUser: authUser,
		title: `${config.project.name} | ${pageName}`,
	};
	const page = req.query.page || 0;
	const size = req.query.size || 25;
	try {
		const manufacturersResponse = await manufacturerService.getManufacturers(req["accessToken"], page, size);
		data.manufacturers = manufacturersResponse.content;
		res.render('manufacturers', data);
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
