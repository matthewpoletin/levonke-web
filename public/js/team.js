"use strict";

const nameInput = document.querySelector("#name");

nameInput.addEventListener("change", (e) => {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", `http://localhost:8441/teams/name/${e.target.value}`, false);
	xhr.send();

	if (xhr.status !== 200) {
		console.log("ABC")
	} else {
		console.log("as")
	}
});