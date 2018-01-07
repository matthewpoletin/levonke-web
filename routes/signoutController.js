const express = require('express');
const router = express.Router();
const config = require("./../config");
const auth = require("./../auth");

router.get('/', function(req, res, next) {

	res.redirect('/');
});

module.exports = router;
