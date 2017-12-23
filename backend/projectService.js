const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class projectService {

	static getProjects(page, size) {
		const options = getOptions(apiService, `/projects`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createProject(projectRequest) {
		const options = getOptions(apiService, `/projects`, null, projectRequest);
		return rp.post(options);
	}

	static getProjectById(id) {
		const options = getOptions(apiService, `/projects/${id}`, null, null);
		return rp.get(options);
	}

	static updateProjectById(id, projectRequest) {
		const options = getOptions(apiService, `/projects/${id}`, null, projectRequest);
		return rp.patch(options);
	}

	static deleteOrganization(id) {
		const options = getOptions(apiService, `/projects/${id}`, null, null);
		return rp.delete(options);
	}

	static getVersionsOfProject(id) {
		const options = getOptions(apiService, `/projects/${id}/versions`, null, null);
		return rp.get(options);
	}
}

module.exports = projectService;
