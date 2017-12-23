const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class organizationService {

	static getOrganizations(page, size, name) {
		const options = getOptions(apiService, `/organizations`, { page: page, size: size, name: name }, null);
		return rp.get(options);
	}

	static createOrganization(componentRequest) {
		const options = getOptions(apiService, `/organizations`, null, componentRequest);
		return rp.post(options);
	}

	static getOrganizationById(id) {
		const options = getOptions(apiService, `/organizations/${id}`, null, null);
		return rp.get(options);
	}

	static getOrganizationByName(name) {
		const options = getOptions(apiService, `/organizations/name/${name}`, null, null);
		return rp.get(options);
	}

	static updateOrganizationById(id, organizationRequest) {
		const options = getOptions(apiService, `/organizations/${id}`, null, organizationRequest);
		return rp.patch(options);
	}

	static deleteOrganizationById(id) {
		const options = getOptions(apiService, `/organizations/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeamsOfOrganization(id, page, size) {
		const options = getOptions(apiService, `/organizations/${id}/teams`, { page: page, size: size }, null);
		return rp.get(options);
	}

}

module.exports = organizationService;
