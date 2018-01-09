"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class organizationService {

	static getOrganizations(accessToken, page, size, name) {
		const options = getOptions(accessToken, apiService, `/organizations`, { page: page, size: size, name: name }, null);
		return rp.get(options);
	}

	static createOrganization(accessToken, componentRequest) {
		const options = getOptions(accessToken, apiService, `/organizations`, null, componentRequest);
		return rp.post(options);
	}

	static getOrganizationById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/organizations/${id}`, null, null);
		return rp.get(options);
	}

	static getOrganizationByName(accessToken, name) {
		const options = getOptions(accessToken, apiService, `/organizations/name/${name}`, null, null);
		return rp.get(options);
	}

	static updateOrganizationById(accessToken, id, organizationRequest) {
		const options = getOptions(accessToken, apiService, `/organizations/${id}`, null, organizationRequest);
		return rp.patch(options);
	}

	static deleteOrganizationById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/organizations/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeamsOfOrganization(accessToken, id, page, size) {
		const options = getOptions(accessToken, apiService, `/organizations/${id}/teams`, { page: page, size: size }, null);
		return rp.get(options);
	}

}

module.exports = organizationService;
