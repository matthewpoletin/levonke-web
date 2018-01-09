"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class componentService {

	static getComponents(accessToken, page, size) {
		const options = getOptions(accessToken, apiService, "/components", { page: page, size: size }, null);
		return rp.get(options);
	}

	static createComponent(accessToken, componentRequest) {
		const options = getOptions(accessToken, apiService, "/components", null, componentRequest);
		return rp.post(options);
	}

	static getComponentById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/components/${id}`, null, null);
		return rp.get(options);
	}

	static getComponentByUUID(accessToken, uuid) {
		return new Promise((resolve, reject) => {
			const options = getOptions(accessToken, apiService, "/component", { uuid: uuid }, null);
			rp.get(options).then((response) => {
				resolve(response)
			})
		})
	}

	static updateComponentById(accessToken, id, componentRequest) {
		const options = getOptions(accessToken, apiService, `/components/${id}`, null, componentRequest);
		return rp.patch(options);
	}

	static deleteComponentById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/components/${id}`, { page: page, size: size }, null);
		return rp.delete(options);
	}

}

module.exports = componentService;
