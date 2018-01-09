"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class projectService {

	static getProjects(accessToken, page, size) {
		const options = getOptions(accessToken, apiService, `/projects`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createProject(accessToken, projectRequest) {
		const options = getOptions(accessToken, apiService, `/projects`, null, projectRequest);
		return rp.post(options);
	}

	static getProjectById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/projects/${id}`, null, null);
		return rp.get(options);
	}

	static updateProjectById(accessToken, id, projectRequest) {
		const options = getOptions(accessToken, apiService, `/projects/${id}`, null, projectRequest);
		return rp.patch(options);
	}

	static deleteProjectById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/projects/${id}`, null, null);
		return rp.delete(options);
	}

	static getVersionsOfProject(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/projects/${id}/versions`, null, null);
		return rp.get(options);
	}
}

module.exports = projectService;
