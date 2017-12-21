const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require("../backend/userService");
const projectService = require("../backend/projectService");
const teamService = require("../backend/teamService");
const organizationService = require("../backend/organizationService");

router.get('/', async (req, res, next) => {
	const defaultPage = 0;
	const defaultSize = 2;
	const page = parseInt(req.query.page, 10) || defaultPage;
	const size = parseInt(req.query.size, 10) || defaultSize;
	let pageType = req.query.type;
	const query = req.query.q;
	const data = {
		projectName: config.project.name,
		title: "Serach" + " | " + query,
		query: query,
		pageInfo: {}
	};
	switch (pageType) {
		case "teams":
		case "Teams":
			try{
				const teamsResponse = await teamService.getTeams(page, size);
				if (teamsResponse) data.teams = teamsResponse.content;
				else data.teams = null;
				data.pageInfo.totalPages = teamsResponse.totalPages;
			} catch (error) {
				console.log(error);
			}
			break;
		case "organizations":
		case "Organizations":
			try{
				const organizationsResponse = await organizationService.getOrganizations(page, size, query);
				if (organizationsResponse) data.organizations = organizationsResponse.content;
				else data.organizations = null;
				data.pageInfo.totalPages = organizationsResponse.totalPages;
			} catch (error) {
				console.log(error);
			}
			break;
		case "users":
		case "Users":
			try {
				data.users = null;
				const usersResponse = await userService.getUsers(page, size, query);
				data.pageInfo.totalPages = usersResponse.totalPages;
				if (usersResponse) data.users = usersResponse;
				else data.users = null;
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
			data.projects = projectResponse.content;
			pageType = "projects";
			break;
	}
	data.pageType = pageType;
	data.pageInfo.page = page;
	data.pageInfo.size = size;
	res.render('search', data);
});

module.exports = router;