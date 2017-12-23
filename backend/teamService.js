const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class teamService {

	static getTeams(page, size, name) {
		const options = getOptions(apiService, `/teams`, { page: page, size: size, name: name }, null);
		rp.get(options);
	}

	static createTeam(teamRequest) {
		const options = getOptions(apiService, `/teams`, null, teamRequest);
		return rp.post(options);
	}

	static getTeamById(id) {
		const options = getOptions(apiService, `/teams/${id}`, null, null);
		return rp.get(options);
	}

	static getTeamBy(name) {
		const options = getOptions(apiService, `/teams/by`, { name: name }, null);
		return rp.get(options);
	}

	static updateTeamById(id, teamRequest) {
		const options = getOptions(apiService, `/teams/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteTeamById(id) {
		const options = getOptions(apiService, `/teams/${id}`, null, null);
		return rp.delete(options);
	}

	static getUsersOfTeam(id) {
		const options = getOptions(apiService, `/teams/${id}/users`, null, null);
		return rp.get(options);
	}

	static getProjectsOfTeam(id) {
		const options = getOptions(apiService, `/teams/${id}/projects`, null, null);
		return rp.get(options);
	}

}

module.exports = teamService;
