"use strict";

const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");
const errorHandler = require("./abstractController");
const teamService = require("./../backend/teamService");
const organizationService = require('./../backend/organizationService');
const projectService = require('./../backend/projectService');

router.get('/:id', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(req["accessToken"], id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
		res.render('team', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: `${config.project.name} | ${teamResponse.name}`,
			pageType: "main",
			team: teamResponse,
			organization: organizationResponse,
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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(req["accessToken"], id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
		const usersResponse = await teamService.getUsersOfTeam(req["accessToken"], id);
		// const projectsResponse = await teamService.getProjectsOfTeam(req["accessToken"], id);
		res.render('team', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(req["accessToken"], id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
		const projectsIdResponse = await teamService.getProjectsOfTeam(req["accessToken"], id);
		const projectsResponsePromises = [];
		projectsIdResponse.forEach((projectId) => {
			const _projectId = parseInt(projectId, 10);
			projectsResponsePromises.push(projectService.getProjectById(req["accessToken"], _projectId));
		});
		const projectsResponse = await Promise.all(projectsResponsePromises);
		res.render('team', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: `${config.project.name} | ${teamResponse.name}`,
			pageType: "projects",
			team: teamResponse,
			organization: organizationResponse,
			projects: projectsResponse,
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
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(req["accessToken"], id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
		res.render('team', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: `${config.project.name} | ${teamResponse.name}`,
			pageType: "settings",
			team: teamResponse,
			organization: organizationResponse,
			users: null,
			projects: null,
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


router.get('/:id/projects/new', async (req, res, next) => {
	const isAuth = !!req["accessToken"];
	const authUser = await auth.getCurrentUser(req["accessToken"]);
	const id = parseInt(req.params.id, 10);
	try {
		const teamResponse = await teamService.getTeamById(id);
		const organizationId = parseInt(teamResponse.organizationId, 10);
		const organizationResponse = await organizationService.getOrganizationById(req["accessToken"], organizationId);
		const projectsIdResponse = await teamService.getProjectsOfTeam(req["accessToken"], id);
		const projectsResponsePromises = [];
		projectsIdResponse.forEach((projectId) => {
			const _projectId = parseInt(projectId, 10);
			projectsResponsePromises.push(projectService.getProjectById(req["accessToken"], _projectId));
		});
		const projectsResponse = await Promise.all(projectsResponsePromises);
		res.render('team', {
			projectName: config.project.name,
			isAuth: isAuth,
			authUser: authUser,
			title: config.project.name + " | " + teamResponse.name,
			pageType: "projects-new",
			team: teamResponse,
			organization: organizationResponse,
			projects: projectsResponse,
		});
	} catch (error) {
		errorHandler(error, req, res, next);
	}
});

module.exports = router;
