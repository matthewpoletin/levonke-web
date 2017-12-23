const express = require('express');
const router = express.Router();
const config = require('./../config');
const userService = require("../backend/userService");
const teamService = require("../backend/teamService");
const organizationService = require("../backend/organizationService");
const projectService = require("../backend/projectService");
const manufacturerService = require("../backend/manufacturerService");

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
		pageInfo: {
			totalPages: 0
		}
	};
	switch (pageType) {
		case "teams":
		case "Teams":
			try{
				data.teams = null;
				const teamsResponse = await teamService.getTeams(page, size, query);
				if (teamsResponse) {
					data.teams = teamsResponse.content;
					data.pageInfo.totalPages = teamsResponse.totalPages;
				}
			} catch (error) {
				console.log(error);
			}
			break;
		case "organizations":
		case "Organizations":
			try{
				data.organizations = null;
				const organizationsResponse = await organizationService.getOrganizations(page, size, query);
				if (organizationsResponse) {
					data.organizations = organizationsResponse.content;
					data.pageInfo.totalPages = organizationsResponse.totalPages;
				}
			} catch (error) {
				console.log(error);
			}
			break;
		case "users":
		case "Users":
			try {
				data.users = null;
				const usersResponse = await userService.getUsers(page, size, query);
				if (usersResponse) {
					data.users = usersResponse;
					data.pageInfo.totalPages = usersResponse.totalPages;
				}
			} catch (error) {
				console.log(error);
			}
			break;
		case "manufacturers":
		case "Manufacturers":
			try {
				data.manufacturers = null;
				const usersResponse = await manufacturerService.getManufacturers(page, size, query);
				if (usersResponse) {
					data.users = usersResponse;
					data.pageInfo.totalPages = usersResponse.totalPages;
				}
			} catch (error) {
				console.log(error);
			}
			// TODO: implement
			break;
		case "projects":
		case "Projects":
		default:
			const projectResponse = await projectService.getProjects(page, size, query);
			if (projectResponse) {
				data.projects = projectResponse.content;
				data.pageInfo.totalPages = projectResponse.totalPages;
			}
			pageType = "projects";
			break;
	}
	data.pageType = pageType;
	data.pageInfo.page = page;
	data.pageInfo.size = size;
	res.render('search', data);
});

module.exports = router;