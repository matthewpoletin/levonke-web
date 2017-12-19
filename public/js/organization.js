"use strict";

const nameInput = document.querySelector("#name");
const officialNameInput = document.querySelector("#officialName");
const submitButton = document.querySelector("#submit");

let nameValid = false;
let officialNameValid = false;

function updateButton() {
	submitButton.disabled = !(nameValid && officialNameValid);
}

nameInput.addEventListener("change", (e) => {
	const req = new XMLHttpRequest();
	req.open('GET', `http://localhost:8441/organizations/by?name=${e.target.value}`);
	req.onreadystatechange = () => {
		if (req.readyState === 4) {
			const parent = e.target.parentNode;
			if (req.status === 200) {
				try {
					const user = JSON.parse(req.responseText);
					e.target.classList.add("error");
					parent.querySelector("span").innerHTML = "This user already exist";
					nameValid = false;
				} catch (error) {
					e.target.classList.remove("error");
					parent.querySelector("span").innerHTML = "";
					nameValid = true;
				}
			} else {
				e.target.classList.remove("error");
				parent.querySelector("span").innerHTML = e.target.value.length ? "" : "This is a required field" ;
				nameValid = false;
			}
		}
	};
	updateButton();
	req.send();
});

officialNameInput.addEventListener("change", (e) => {
	const parent = e.target.parentNode;
	if (e.target.value.length === 0) {
		e.target.classList.add("error");
		parent.querySelector("span").innerHTML = "This is a required field";
		officialNameValid = false;
	} else {
		e.target.classList.remove("error");
		parent.querySelector("span").innerHTML = "";
		officialNameValid = true;
	}
	updateButton()
});

