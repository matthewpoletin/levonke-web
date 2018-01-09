"use strict";

const config = require("../../config.json");

function auth() {
    return (req, res, next) => {
        let skipAuthCheck = false;
        config["noAuthCheck"].forEach((url) => {
            if (new RegExp(url).test(req.url)) { skipAuthCheck = true; }
        });
        if (skipAuthCheck) { return next(); }

        // Нет Access-Token - на страницу авторизации
        if (!req.cookies["Access-Token"]) {
            res.redirect("/login");
        } else {
            // Позже по св-во accessToken будет присутствовать в объекте req в контроллерах
            req["accessToken"] = req.cookies["Access-Token"];
        }
        return next();
    }
}

module.exports = auth;
