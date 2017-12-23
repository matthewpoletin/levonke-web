const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class userService {

	static getUsers(page, size, username) {
		const options = getOptions(apiService, `/users`, { page: page, size: size, username: username}, null);
		return rp.get(options);
	}

	static createUser(userRequest) {
		const options = getOptions(apiService, `/users`, null, userRequest);
		return rp.post(options);
	}

	static getUserById(id) {
		const options = getOptions(apiService, `/users/${id}`, null, null);
		return rp.get(options);
	}

	static getUserBy(params) {
		const options = getOptions(apiService, `/users/by`, params, null);
		return rp.get(options);
	}

	static updateUserById(id, userRequest) {
		const options = getOptions(apiService, `/users/${id}`, null, userRequest);
		return rp.patch(options);
	}

	static deleteUserById(id) {
		const options = getOptions(apiService, `/users/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeams(id) {
		const options = getOptions(apiService, `/users/${id}/teams`, null, null);
		return rp.get(options);
	}
}

module.exports = userService;
