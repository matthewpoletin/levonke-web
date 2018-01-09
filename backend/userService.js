"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class userService {

	static getUsers(accessToken, page, size, username) {
		const options = getOptions(accessToken, apiService, `/users`, { page: page, size: size, username: username}, null);
		return rp.get(options);
	}

	static createUser(accessToken, userRequest) {
		const options = getOptions(accessToken, apiService, `/users`, null, userRequest);
		return rp.post(options);
	}

	static getUserById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/users/${id}`, null, null);
		return rp.get(options);
	}

	static getUserBy(accessToken, params) {
		const options = getOptions(accessToken, apiService, `/users/by`, params, null);
		return rp.get(options);
	}

	static updateUserById(accessToken, id, userRequest) {
		const options = getOptions(accessToken, apiService, `/users/${id}`, null, userRequest);
		return rp.patch(options);
	}

	static deleteUserById(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/users/${id}`, null, null);
		return rp.delete(options);
	}

	static getTeams(accessToken, id) {
		const options = getOptions(accessToken, apiService, `/users/${id}/teams`, null, null);
		return rp.get(options);
	}
}

module.exports = userService;
