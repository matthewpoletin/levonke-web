"use strict";

function onLoginFormSubmit(e) {
    e.preventDefault();

    const username = "username"; // Должен получить значение из input-а в форме
    const password = "password"; // Должен получить значение из input-а в форме

    const req = new XMLHttpRequest();
    req.open("POST", "/path/to/apilogin");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                try {
                    const credentials = JSON.parse(req.responseText);
                    document.APP.setCookie({
                        name: "Auth-Token",
                        value: credentials["Auth-Token"],
                    });
                    window.location.replace("/path/to/userpage");
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
}
