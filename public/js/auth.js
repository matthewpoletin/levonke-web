"use strict";

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#submit");

let usernameValid = false;
let passwordValid = false;

const passwordMinLength = 8;

usernameInput.addEventListener("change", (e) => {
	const parent = e.target.parentNode;
	if (e.target.value.length === 0) {
		e.target.classList.add("error");
		parent.querySelector("span").innerHTML = "This is a required field";
		usernameValid = false;
	} else {
		e.target.classList.remove("error");
		parent.querySelector("span").innerHTML = "";
		usernameValid = true;
	}
	// updateButton();
});

passwordInput.addEventListener("change", (e) => {
	const parent = e.target.parentNode;
	if (e.target.value.length === 0) {
		e.target.classList.add("error");
		parent.querySelector("span").innerHTML = "This a is required field";
		passwordValid = false;
	}
	else {
		if (e.target.value.length < passwordMinLength) {
			e.target.classList.add("error");
			parent.querySelector("span").innerHTML = `Password should be ${passwordMinLength} characters long`;
			passwordValid = false;
		} else {
			e.target.classList.remove("error");
			parent.querySelector("span").innerHTML = "";
			passwordValid = true;
		}
	}
	// updateButton()
});

function updateButton() {
	submitButton.disabled = !(usernameValid && passwordValid);
}

submitButton.addEventListener("click", (e) => {
	e.preventDefault();

	const username = usernameInput.value;
	const password = passwordInput.value;

	const req = new XMLHttpRequest();

	req.open('POST', `http://localhost:8441/auth/login`);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.onreadystatechange = () => {
		if (req.readyState === 4) {
			if (req.status === 201) {
				try {
					const credentials = JSON.parse(req.responseText);
					document.APP.setCookie({
						name: "Access-Token",
						value: credentials["accessToken"],
                    });
					window.location.replace(`/user/${username}`);
				} catch (error) {
					console.error("Error on ApiLogin, responseText: " + req.responseText);
					console.error(error);
				}
			} else {
				console.error("Credentials not valid!");
			}
		}
	};
	req.send(JSON.stringify({username: username, password: password}));
});
