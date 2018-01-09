"use strict";

function getOptions(accessToken, apiUrl, path, params, body) {
	const options = {
		body,
		json: true,
		qs: params,
		uri: apiUrl + path,
	};
	if (accessToken) {
		options.headers = Object.assign({}, options.headers, {"Access-Token": accessToken});
	}
	return options;
}

module.exports = getOptions;
