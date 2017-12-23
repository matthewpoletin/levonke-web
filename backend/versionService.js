const rp = require('request-promise');
const config = require("./../config");
const getOptions = require('./../options');

const apiService = `http://${config.api.address}:${config.api.port}`;

class versionService {

	static getVersions(page, size) {
		const options = getOptions(apiService, `/versions`, { page: page, size: size }, null);
		rp.get(options);
	}

	static createVersion(versionRequest) {
		const options = getOptions(apiService, `/versions`, null, versionRequest);
		return rp.post(options);
	}

	static getVersionById(id) {
		const options = getOptions(apiService, `/versions/${id}`, null, null);
		return rp.get(options);
	}

	static updateVersionById(id, teamRequest) {
		const options = getOptions(apiService, `/versions/${id}`, teamRequest, null);
		return rp.patch(options);
	}

	static deleteVersionById(id) {
		const options = getOptions(apiService, `/versions/${id}`, null, null);
		return rp.delete(options);
	}

	static getComponentsOfVersion(id) {
		const options = getOptions(apiService, `/versions/${id}/components`, null, null);
		return rp.get(options);
	}

}

module.exports = versionService;
