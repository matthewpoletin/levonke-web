"use strict";

const manufacturerPartNumberInput = document.querySelector("#manufacturerPartNumber");
const submitButton = document.querySelector("#submit");

let manufacturerPartNumberValid = false;

function updateButton() {
	submitButton.disabled = !manufacturerPartNumberValid;
}

manufacturerPartNumberInput.addEventListener("change", (e) => {
	const req = new XMLHttpRequest();
	req.open('GET', `http://localhost:8441/components/by?manufacturerPartNumber=${e.target.value}`);
	req.onreadystatechange = () => {
		if (req.readyState === 4) {
			const parent = e.target.parentNode;
			if (req.status === 200) {
				try {
					const component = JSON.parse(req.responseText);
					e.target.classList.add("error");
					parent.querySelector("span").innerHTML = "This component already exist";
					manufacturerPartNumberValid = false;
				} catch (error) {
					e.target.classList.remove("error");
					parent.querySelector("span").innerHTML = "";
					manufacturerPartNumberValid = true;
				}
			} else {
				e.target.classList.remove("error");
				parent.querySelector("span").innerHTML = e.target.value.length ? "" : "This is a required field" ;
				manufacturerPartNumberValid = false;
			}
		}
	};
	updateButton();
	req.send();
});