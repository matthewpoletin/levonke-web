const rp = require('request-promise');
const getOptions = require('./../options');

// TODO: load api server address from config file
class teamService {

	static getTeams(page, size) {
		const options = getOptions("http://localhost:8441", `/teams`, { page: page, size: size }, null);
		rp.get(options);
	}

	static createTeam(teamRequest) {
		const options = getOptions("http://localhost:8441", `/teams`, null, teamRequest);
		return rp.post(options);
	}

	static getTeamById(id) {
		const options = getOptions("http://localhost:8441", `/teams/${id}`, null, null);
		return rp.get(options);
	}

	// TODO: add support in community service and api
	static getTeamByName(name) {
		const options = getOptions("http://localhost:8441", `/team/name/${name}`, null, null);
		return rp.get(options);
	}

	static updateTeamById(id, teamRequest) {
		const options = getOptions("http://localhost:8441", `/teams/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteTeamById(id) {
		const options = getOptions("http://localhost:8441", `/teams/${id}`, null, null);
		return rp.delete(options);
	}

	static getUsersOfTeam(id) {
		const options = getOptions("http://localhost:8441", `/teams/${id}/users`, null, null);
		return rp.get(options);
	}

	static getProjectsOfTeam(id) {
		const options = getOptions("http://localhost:8441", `/teams/${id}/projects`, null, null);
		return rp.get(options);
	}

}

module.exports = teamService;
