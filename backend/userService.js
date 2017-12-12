const rp = require('request-promise');
const getOptions = require('./../options');

class userService {

	static getUsers(page, size) {
		const options = getOptions("http://localhost:8441/", `users`, { page: page, size: size }, null);
		return rp.get(options);
	}

	static createUser(userRequest) {
		const options = getOptions("http://localhost:8441/", `users`, userRequest, null);
		return rp.post(options);
	}

	static getUserById(id) {
		const options = getOptions("http://localhost:8441/", `users/${id}`, null, null);
		return rp.get(options);
	}

	static getUserByUsername(username) {
		const options = getOptions("http://localhost:8441/", `user/${username}`, null, null);
		return rp.get(options);
	}

	static updataUserById(id, userRequest) {
		const options = getOptions("http://localhost:8441/", `users/${id}`, null, userRequest);
		return rp.patch(options);
	}

	static deleteUserById(id) {
		const options = getOptions("http://localhost:8441/", `users/${id}`, null, null);
		return rp.delete(options);
	}

}

module.exports = userService;
