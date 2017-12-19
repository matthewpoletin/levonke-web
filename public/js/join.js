"use strict";

const passwordMinLength = 8;

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const cbInput = document.querySelector("#cb");
const submitButton = document.querySelector("#submit");

let usernameValid = false;
let emailValid = false;
let passwordValid = false;
let cbValid = false;

function updateButton() {
	submitButton.disabled = !(usernameValid && emailValid && passwordValid && cbValid);
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

emailInput.addEventListener("change", (e) => {
	const req = new XMLHttpRequest();
	req.open('GET', `http://localhost:8441/users/by?email=${e.target.value}`);
	req.onreadystatechange = () => {
		if (req.readyState === 4) {
			const parent = e.target.parentNode;
			if (req.status === 200) {
				try {
					const user = JSON.parse(req.responseText);
					e.target.classList.add("error");
					parent.querySelector("span").innerHTML = "This email is already used";
					emailValid = false;
				} catch (error) {
					e.target.classList.remove("error");
					parent.querySelector("span").innerHTML = "";
					emailValid = true;
				}
			} else {
				e.target.classList.remove("error");
				parent.querySelector("span").innerHTML = e.target.value.length ? "" : "This is a required field" ;
				emailValid = false;
			}
		}
	};
	updateButton();
	req.send();
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
	updateButton()
});

cbInput.addEventListener("change", (e) => {
	cbValid = cbInput.checked;
	updateButton();
});
