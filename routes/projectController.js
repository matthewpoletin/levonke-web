const express = require('express');
const router = express.Router();
const config = require('./../config');
const auth = require("./../auth");
const projectService = require("./../backend/projectService");
const versionService = require("./../backend/versionService");
const componentService = require("./../backend/componentService");
const manufacturerService = require("./../backend/manufacturerService");

router.get('/:id', async (req, res, next) => {
	const projectId = parseInt(req.params.id, 10);
	const data = {
		projectName: config.project.name,
		title: config.project.name,
		pageType: "main"
	};
	// TODO: [AUTH]
	data.isAuthorized = auth.getCurrentUser().username === "MatthewPoletin";
	try {
		const projectResponse = await projectService.getProjectById(projectId);
		if (projectResponse) {
			data.project = projectResponse;
			data.title = config.project.name + " | " + projectResponse.officialName;
		} else data.project = null;
	} catch (error) {
		console.log(error);
	}
	res.render('project', data);
});

/**
 *
 */
router.get('/:id/versions', async (req, res, next) => {
	const projectId = parseInt(req.params.id, 10);
	const data = {
		projectName: config.project.name,
		title: config.project.name,
		pageType: "versions",
		project: null,
		versions: []
	};
	// TODO: [AUTH]
	data.isAuthorized = auth.getCurrentUser().username === "MatthewPoletin";
	try {
		const projectResponse = await projectService.getProjectById(projectId);
		if (projectResponse) {
			data.project = projectResponse;
			data.title = config.project.name + " | " + projectResponse.officialName;
		} else data.project = null;

		const versionsResponse = await projectService.getVersionsOfProject(projectId);
		if (versionsResponse) {
			data.versions = versionsResponse.content;
		} else data.versions = null;
	} catch (error) {
		console.log(error);
	}
	res.render('project', data);
});

router.get('/:id/settings', async (req, res, next) => {
	// TODO: [AUTH]
	// const isAuthorized = false;
	const isAuthorized = auth.getCurrentUser().username === "MatthewPoletin";
	if (isAuthorized) {
		const projectId = parseInt(req.params.id, 10);
		const data = {
			projectName: config.project.name,
			title: config.project.name,
			pageType: "settings"
		};
		data.isAuthorized = isAuthorized;
		try {
			const projectResponse = await projectService.getProjectById(projectId);
			if (projectResponse) {
				data.project = projectResponse;
				data.title = config.project.name + " | " + projectResponse.officialName;
			} else data.project = null;
		} catch (error) {
			console.log(error);
		}
		res.render('project', data);
	} else {
		const data = {
			projectName: config.project.name,
			title: "Not authorized",
			isAuthorized: isAuthorized,
			message: "",
			error: {
				status: "",
				stack: ""
			}
		};
		res.render('error', data);
	}
});

module.exports = router;
