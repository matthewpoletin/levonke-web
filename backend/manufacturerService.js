const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class manufacturerService {

	static getManufacturers(page, size, name) {
		const options = getOptions(apiService, `/manufacturers`, { page: page, size: size, name: name }, null);
		return rp.get(options);
	}

	static createManufacturer(manufacturerRequest) {
		const options = getOptions(apiService, `/manufacturers`, null, apiService);
		return rp.post(options);
	}

	static getManufacturerById(id) {
		const options = getOptions(apiService, `/manufacturers/${id}`, null, null);
		return rp.get(options);
	}

	static updateManufacturerById(id, manufacturerRequest) {
		const options = getOptions(apiService, `/manufacturers/${id}`, null, manufacturerRequest);
		return rp.patch(options);
	}

	static deleteManufacturerById(id) {
		const options = getOptions(apiService, `/manufacturers/${id}`, null, null);
		return rp.delete(options);
	}

	static getComponentsOfManufacturer(id) {
		const options = getOptions(apiService, `/manufacturers/${id}/components`, null, null);
		return rp.get(options);
	}
}

module.exports = manufacturerService;
