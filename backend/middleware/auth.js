"use strict";

const config = require("../../config.json");

module.exports = () => {
    return (req, res, next) => {
        // NoAuthCheck - массив публичных url (можно regexp, например /public/*)
        let skipAuthCheck = false;
        config["noauthcheck"].forEach((url) => {
            if (new RegExp(url).test(req.url)) { skipAuthCheck = true; }
        });
        if (skipAuthCheck) { return next(); }

        // Нет Access-Token - на страницу авторизации
        if (!req.cookies["Access-Token"]) {
            res.redirect("/path/to/loginpage");
        } else {
            // Позже по св-во accessToken будет присутствовать в объекте req в контроллерах
            req["accessToken"] = req.cookies["Access-Token"];
            return next();
        }
    }
}
