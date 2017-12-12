const express = require('express');
const router = express.Router();
const config = require('./../config');
const projectService = require('./../backend/projectSerivce');
const teamService = require("../backend/teamService");

router.get('/', async (req, res, next) => {
	const defaultPage = 0;
	const defaultSize = 25;
	const page = parseInt(req.query.page, 10) || defaultPage;
	const size = parseInt(req.query.size, 10) || defaultSize;
	let pageType = req.query.type;
	const query = req.query.q;
	switch (pageType) {
		case "teams":
		case "Teams":
			const teamsResponse = await teamService.getTeams(page, size);
			break;
		case "organizations":
		case "Organizations":
			// TODO: implement
			break;
		case "users":
		case "Users":
			// TODO: implement
			break;
		case "manufacturers":
		case "Manufacturers":
			// TODO: implement
			break;
		case "projects":
		case "Projects":
		default:
			const projectResponse = await projectService.getProjects(page, size);
			pageType = "projects";
			break;
	}
	res.render('search', {
		pageType: pageType,
		projectName: config.project.name,
		title: "Serach" + " | " + query,
	});
});

module.exports = router;