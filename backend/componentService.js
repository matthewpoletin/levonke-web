const rp = require('request-promise');
const getOptions = require('./../options');

class componentService {

	static getComponents(page, size) {
		const options = getOptions("http://localhost:8441/", "components", { page: page, size: size }, null);
		return rp.get(options);
	}

	static createComponent(componentRequest) {
		const options = getOptions("http://localhost:8441/", "components", null, componentRequest);
		return rp.post(options);
	}

	static getComponentById(id) {
		const options = getOptions("http://localhost:8441/", `components/${id}`, null, null);
		return rp.get(options);
	}

	static getComponentByUUID(uuid) {
		return new Promise((resolve, reject) => {
			const options = getOptions("http://localhost:8441/", "component", { uuid: uuid }, null);
			rp.get(options).then((response) => {
				resolve(response)
			})
		})
	}

	static updateComponentById(id, componentRequest) {
		const options = getOptions("http://localhost:8441/", `components/${id}`, null, componentRequest);
		return rp.patch(options);
	}

	static deleteComponentById(id) {
		const options = getOptions("http://localhost:8441/", `components/${id}`, { page: page, size: size }, null);
		return rp.delete(options);
	}

}

module.exports = componentService;
