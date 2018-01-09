"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require('./../options');

const apiService = `http://${config.api.address}:${config.api.port}`;

class versionService {

	static getVersions(accessToken, page, size) {
		const options = getOptions(accessToken, apiService, `/versions`, { page: page, size: size }, null);
		rp.get(options);
	}

	static createVersion(accessToken, versionRequest) {
		const options = getOptions(accessToken, apiService, `/versions`, null, versionRequest);
		return rp.post(options);
	}

	static getVersionById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/versions/${id}`, null, null);
		return rp.get(options);
	}

	static updateVersionById(accessToken, id, teamRequest) {
		const options = getOptions(accessToken, apiService, `/versions/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteVersionById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/versions/${id}`, null, null);
		return rp.delete(options);
	}

	static getComponentsOfVersion(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/versions/${id}/components`, null, null);
		return rp.get(options);
	}

}

module.exports = versionService;
