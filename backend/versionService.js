const rp = require('request-promise');
const getOptions = require('./../options');

class versionService {

	static getVersions(page, size) {
		const options = getOptions("http://localhost:8441/", `versions`, { page: page, size: size }, null);
		rp.get(options);
	}

	static createVersion(versionRequest) {
		const options = getOptions("http://localhost:8441/", `versions`, versionRequest, null);
		return rp.post(options);
	}

	static getTeamById(id) {
		const options = getOptions("http://localhost:8441/", `versions/${id}`, null, null);
		return rp.get(options);
	}

	static updateTeamById(id, teamRequest) {
		const options = getOptions("http://localhost:8441/", `versions/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteTeamById(id) {
		const options = getOptions("http://localhost:8441/", `versions/${id}`, null, null);
		return rp.delete(options);
	}

}

module.exports = teamService;
