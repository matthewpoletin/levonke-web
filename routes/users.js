const express = require('express');
const router = express.Router();
const rp = require("request-promise");

const projectName = "Levonke";

router.get('/', function(req, res, next) {
	res.render('users', {title: projectName + " | Users"});
});

router.get('/:username', function(req, res, next) {
	rp.get("http://localhost:8441/user/" + req.params.username);
	res.render('users', {title: projectName + " | " + req.params.username});
});

module.exports = router;
