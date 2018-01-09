"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class teamService {

	static getTeams(accessToken, page, size, name) {
		const options = getOptions(accessToken, apiService, `/teams`, { page: page, size: size, name: name }, null);
		rp.get(options);
	}

	static createTeam(accessToken, teamRequest) {
		const options = getOptions(accessToken, apiService, `/teams`, null, teamRequest);
		return rp.post(options);
	}

	static getTeamById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/teams/${id}`, null, null);
		return rp.get(options);
	}

	static getTeamBy(accessToken, name) {
		const options = getOptions(accessToken, apiService, `/teams/by`, { name: name }, null);
		return rp.get(options);
	}

	static updateTeamById(accessToken, id, teamRequest) {
		const options = getOptions(accessToken, apiService, `/teams/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteTeamById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/teams/${id}`, null, null);
		return rp.delete(options);
	}

	static getUsersOfTeam(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/teams/${id}/users`, null, null);
		return rp.get(options);
	}

	static getProjectsOfTeam(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/teams/${id}/projects`, null, null);
		return rp.get(options);
	}

}

module.exports = teamService;
