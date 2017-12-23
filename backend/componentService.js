const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class componentService {

	static getComponents(page, size) {
		const options = getOptions(apiService, "/components", { page: page, size: size }, null);
		return rp.get(options);
	}

	static createComponent(componentRequest) {
		const options = getOptions(apiService, "/components", null, componentRequest);
		return rp.post(options);
	}

	static getComponentById(id) {
		const options = getOptions(apiService, `/components/${id}`, null, null);
		return rp.get(options);
	}

	static getComponentByUUID(uuid) {
		return new Promise((resolve, reject) => {
			const options = getOptions(apiService, "/component", { uuid: uuid }, null);
			rp.get(options).then((response) => {
				resolve(response)
			})
		})
	}

	static updateComponentById(id, componentRequest) {
		const options = getOptions(apiService, `/components/${id}`, null, componentRequest);
		return rp.patch(options);
	}

	static deleteComponentById(id) {
		const options = getOptions(apiService, `/components/${id}`, { page: page, size: size }, null);
		return rp.delete(options);
	}

}

module.exports = componentService;
