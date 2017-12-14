const express = require('express');
const router = express.Router();
const config = require('./../config');
const teamService = require("./../backend/teamService");
const organizationService = require('./../backend/organizationService');
const projectService = require('./../backend/projectService');

router.get('/:id', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id, 10);
		const teamResponse = await teamService.getTeamById(id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(organizationId);
		// const usersResponse = await teamService.getUsersOfTeam(id);
		// const projectsResponse = await teamService.getProjectsOfTeam(id);
		res.render('team', {
			projectName: config.project.name,
			pageType: "main",
			title: config.project.name + " | " + teamResponse.name,
			team: teamResponse,
			organization: organizationResponse,
			// organization: null,
			// users: usersResponse,
			users: null,
			// projects: projectsResponse
			projects: null
		});
	} catch (error) {
		res.render('error', {
			projectName: config.project.name,
			title: error.statusCode,
			message: error.message,
			error: error
		});
	}
});

router.get('/:id/users', async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(organizationId);
		const usersResponse = await teamService.getUsersOfTeam(id);
		// const projectsResponse = await teamService.getProjectsOfTeam(id);
		res.render('team', {
			projectName: config.project.name,
			title: config.project.name + " | " + teamResponse.name,
			pageType: "users",
			team: teamResponse,
			organization: organizationResponse,
			users: usersResponse,
		});
	} catch (error) {
		res.render('error', {
			projectName: config.project.name,
			title: error.statusCode,
			message: error.message,
			error: error
		});
	}
});

router.get('/:id/projects', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id, 10);
		const teamResponse = await teamService.getTeamById(id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(organizationId);
		const projectsIdResponse = await teamService.getProjectsOfTeam(id);
		const projectsResponsePromises = [];
		projectsIdResponse.forEach((projectId) => {
			const _projectId = parseInt(projectId, 10);
			projectsResponsePromises.push(projectService.getProjectById(_projectId));
		});
		const projectsResponse = await Promise.all(projectsResponsePromises);
		res.render('team', {
			projectName: config.project.name,
			title: config.project.name + " | " + teamResponse.name,
			pageType: "projects",
			team: teamResponse,
			organization: organizationResponse,
			projects: projectsResponse
		});
	} catch (error) {
		res.render('error', {
			projectName: config.project.name,
			title: error.statusCode,
			message: error.message,
			error: error
		});
	}
});

router.get('/:id/settings', async (req, res, next) => {
	try {
		const id = parseInt(req.params.id, 10);
		const teamResponse = await teamService.getTeamById(id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(organizationId);
		res.render('team', {
			projectName: config.project.name,
			title: config.project.name + " | " + teamResponse.name,
			pageType: "settings",
			team: teamResponse,
			organization: organizationResponse,
			users: null,
			projects: null
		});
	} catch (error) {
		res.render('error', {
			projectName: config.project.name,
			title: error.statusCode,
			message: error.message,
			error: error
		});
	}
});

module.exports = router;
