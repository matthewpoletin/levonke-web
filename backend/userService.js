const rp = require('request-promise');
const getOptions = require('./../options');

class userService {

	static getUsers(page, size, username) {
		const options = getOptions("http://localhost:8441", `/users`, { page: page, size: size, username: username}, null);
		return rp.get(options);
	}

	static createUser(userRequest) {
		const options = getOptions("http://localhost:8441", `/users`, null, userRequest);
		return rp.post(options);
	}

	static getUserById(id) {
		const options = getOptions("http://localhost:8441", `/users/${id}`, null, null);
		return rp.get(options);
	}

	static getUserBy(params) {
		const options = getOptions("http://localhost:8441", `/users/by`, params, null);
		return rp.get(options);
	}

	static updateUserById(id, userRequest) {
		const options = getOptions("http://localhost:8441", `/users/${id}`, null, userRequest);
		return rp.patch(options);
	}

	static deleteUserById(id) {
		const options = getOptions("http://localhost:8441", `/users/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeams(id) {
		const options = getOptions("http://localhost:8441", `/users/${id}/teams`, null, null);
		return rp.delete(options);
	}
}

module.exports = userService;
