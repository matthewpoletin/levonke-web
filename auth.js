const userService = require("./backend/userService");

class auth {

	/**
	 *
	 * @return {{userResponse}}
	 */
	static getCurrentUser() {
		// TODO: [AUTH] change to real one
		const username = "MatthewPoletin";
		try {
			return userService.getUserBy({username});
		} catch (error) {
			console.log(`Error: user ${username} not found`);
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