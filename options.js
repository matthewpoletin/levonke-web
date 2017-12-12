"use strict";

function getOptions(apiUrl, path, params, body) {
	return {
		body,
		json: true,
		qs: params,
		uri: apiUrl + path,
	};
}

module.exports = getOptions;
