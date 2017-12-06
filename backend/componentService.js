const rp = require('request-promise');

function getOptions(apiUrl, path, params, body) {
	return {
		body,
		json: true,
		qs: params,
		uri: apiUrl + path,
	};
}

class componentService {

	static async getComponentByUUID(uuid) {
		const options = getOptions("http://localhost:8441/", "component", { uuid: uuid }, null);
		const response = await rp.get(options);
		return response;
	}

}

module.exports = componentService;
