const rp = require('request-promise');
const getOptions = require('./../options');

class manufacturerService {

	static getManufacturers(page, size) {
		const options = getOptions("http://localhost:8441/", `manufacturers`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createManufacturer(componentRequest) {
		const options = getOptions("http://localhost:8441/", `manufacturers`, null, componentRequest);
		return rp.post(options);
	}

	static getManufacturerById(id) {
		const options = getOptions("http://localhost:8441/", `manufacturers/${id}`, null, null);
		return rp.get(options);
	}

	static updateManufacturerById(id, manufacturerRequest) {
		const options = getOptions("http://localhost:8441/", `manufacturers/${id}`, null, manufacturerRequest);
		return rp.patch(options);
	}

	static deleteManufacturerById(id) {
		const options = getOptions("http://localhost:8441/", `manufacturers/${id}`, null, null);
		return rp.delete(options);
	}

	static getComponentsOfManufacturer(id) {
		const options = getOptions("http://localhost:8441/", `manufacturers/${id}/components`, null, null);
		return rp.get(options);
	}
}

module.exports = manufacturerService;
