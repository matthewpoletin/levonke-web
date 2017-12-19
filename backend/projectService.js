const rp = require('request-promise');
const getOptions = require('./../options');

// TODO: load api server address from config file
class projectService {

	static getProjects(page, size) {
		const options = getOptions("http://localhost:8441", `/projects`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createProject(projectRequest) {
		const options = getOptions("http://localhost:8441", `/projects`, null, projectRequest);
		return rp.post(options);
	}

	static getProjectById(id) {
		const options = getOptions("http://localhost:8441", `/projects/${id}`, null, null);
		return rp.get(options);
	}

	static updateProjectById(id, projectRequest) {
		const options = getOptions("http://localhost:8441", `/projects/${id}`, null, projectRequest);
		return rp.patch(options);
	}

	static deleteOrganization(id) {
		const options = getOptions("http://localhost:8441", `/projects/${id}`, null, null);
		return rp.delete(options);
	}

}

module.exports = projectService;
