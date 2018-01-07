"use strict";

const usernameInput = document.querySelector("#username");
const forenameInput  = document.querySelector("#forename");
const surnameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#regEmail");
const submitInfoButton = document.querySelector("#submitInfo");

const oldUsername = usernameInput.value;
const oldEmail = emailInput.value;
const oldForename = forenameInput.value;
const oldSurname = surnameInput.value;

const prevPassword = document.querySelector("#prevPassword");
const newPassword = document.querySelector("#newPassword");
const newPasswordCheck = document.querySelector("#newPasswordCheck");
const submitPasswordButton = document.querySelector("#submitPassword");

let usernameValid = false;

function updateButton() {
	if (valuesChanged()) {
		submitInfoButton.disabled = usernameValid;
	}

	// submitInfoButton.disabled = !(usernameValid && emailValid && passwordValid && cbValid);
}

function usernameChanged() {
	return oldUsername !== usernameInput.value;
}

function forenameChanged() {
	return oldUsername !== usernameInput.value;
}

function surnameChanged() {
	return oldUsername !== usernameInput.value;
}

function valuesChanged() {
	return (usernameChanged() || forenameChanged() || surnameChanged());
}

usernameInput.addEventListener("change", (e) => {
	const req = new XMLHttpRequest();
	req.open('GET', `http://localhost:8441/users/by?username=${e.target.value}`);
	req.onreadystatechange = () => {
		if (req.readyState === 4) {
			const parent = e.target.parentNode;
			if (req.status === 200) {
				try {
					const user = JSON.parse(req.responseText);
					e.target.classList.add("error");
					parent.querySelector("span").innerHTML = "This user already exist";
					usernameValid = false;
				} catch (error) {
					e.target.classList.remove("error");
					parent.querySelector("span").innerHTML = "";
					usernameValid = true;
				}
			} else {
				e.target.classList.remove("error");
				parent.querySelector("span").innerHTML = e.target.value.length ? "" : "This is a required field" ;
				usernameValid = false;
			}
		}
	};
	updateButton();
	req.send();
});
