"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class manufacturerService {

	static getManufacturers(accessToken, page, size, name) {
		const options = getOptions(accessToken, apiService, `/manufacturers`, { page: page, size: size, name: name }, null);
		return rp.get(options);
	}

	static createManufacturer(accessToken, manufacturerRequest) {
		const options = getOptions(accessToken, apiService, `/manufacturers`, null, apiService);
		return rp.post(options);
	}

	static getManufacturerById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/manufacturers/${id}`, null, null);
		return rp.get(options);
	}

	static updateManufacturerById(accessToken, id, manufacturerRequest) {
		const options = getOptions(accessToken, apiService, `/manufacturers/${id}`, null, manufacturerRequest);
		return rp.patch(options);
	}

	static deleteManufacturerById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/manufacturers/${id}`, null, null);
		return rp.delete(options);
	}

	static getComponentsOfManufacturer(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/manufacturers/${id}/components`, null, null);
		return rp.get(options);
	}
}

module.exports = manufacturerService;
