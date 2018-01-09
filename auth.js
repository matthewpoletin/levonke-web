"use strict";

const authService = require("./backend/authService");
const userService = require("./backend/userService");

class auth {

	/**
	 *
	 * @param accessToken
	 * @return {*}
	 */
	static async getCurrentUser(accessToken) {
		if (!!accessToken) {
			try {
				const userResponse = await authService.check({ accessToken: accessToken });
				return await userService.getUserBy(accessToken, { username: userResponse.username });
			} catch (error) {
				console.log(`Error: user not found`);
			}
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param userRequest
	 */
	static setCurrentUser(userRequest) {
		// TODO: [AUTH] set user
	}

	/**
	 *
	 * @return {boolean}
	 */
	static isAuth() {
		// TODO: [AUTH] check if user did auth
		return true;
	}

}

module.exports = auth;