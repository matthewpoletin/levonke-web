const rp = require('request-promise');
const getOptions = require('./../options');

class organizationService {

	static getOrganizations(page, size) {
		const options = getOptions("http://localhost:8441/", `organizations`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createOrganization(componentRequest) {
		const options = getOptions("http://localhost:8441/", `organizations`, null, componentRequest);
		return rp.post(options);
	}

	static getOrganizationById(id) {
		const options = getOptions("http://localhost:8441/", `organizations/${id}`, null, null);
		return rp.get(options);
	}

	static updateOrganizationById(id, organizationRequest) {
		const options = getOptions("http://localhost:8441/", `organizations/${id}`, null, organizationRequest);
		return rp.patch(options);
	}

	static deleteOrganizationById(id) {
		const options = getOptions("http://localhost:8441/", `organizations/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeamsOfOrganization(id, page, size) {
		const options = getOptions("http://localhost:8441/", `organizations/${id}/teams`, { page: page, size: size }, null);
		return rp.get(options);
	}

}

module.exports = organizationService;
