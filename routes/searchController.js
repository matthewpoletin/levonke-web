const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require("../backend/userService");
const projectService = require("../backend/projectService");
const teamService = require("../backend/teamService");

router.get('/', async (req, res, next) => {
	const defaultPage = 0;
	const defaultSize = 25;
	const page = parseInt(req.query.page, 10) || defaultPage;
	const size = parseInt(req.query.size, 10) || defaultSize;
	let pageType = req.query.type;
	const query = req.query.q;
	const data = {
		projectName: config.project.name,
		title: "Serach" + " | " + query,
		query: query
	};
	switch (pageType) {
		case "teams":
		case "Teams":
			try{
				const teamsResponse = await teamService.getTeams(page, size);
				if (teamsResponse) data.teams = teamsResponse;
				else data.teams = null;
			} catch (error) {
				console.log(error);
			}
			break;
		case "organizations":
		case "Organizations":
			// TODO: implement
			break;
		case "users":
		case "Users":
			try {
				data.users = null;
				const usersResponse = await userService.getUsers(page, size, query);
				if (usersResponse) {
					data.users = usersResponse;
				}
			} catch (error) {
				console.log(error);
			}
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
	data.pageType = pageType;
	res.render('search', data);
});

module.exports = router;