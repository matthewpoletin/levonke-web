"use strict";

const rp = require('request-promise');
const config = require("./../config");
const getOptions = require("./../options");

const apiService = `http://${config.api.address}:${config.api.port}`;

class componentService {

	static login(page, size) {
		const options = getOptions(null, apiService, "/auth/login", { page: page, size: size }, null);
		return rp.post(options);
	}

	static check(tokenRequest) {
		const options = getOptions(null, apiService, "/auth/check", null, tokenRequest);
		return rp.post(options);
	}

	static refresh(refreshRequest) {
		const options = getOptions(null, apiService, "/auth/refresh", null, refreshRequest);
		return rp.post(options);
	}

	static logout(tokenRequest) {
		const options = getOptions(null, apiService, `/auth/logout`, null, tokenRequest);
		return rp.post(options);
	}

}

module.exports = componentService;
