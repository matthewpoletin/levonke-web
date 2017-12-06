const express = require('express');
const router = express.Router();
const componentService = require('./../backend/componentService');

const projectName = "Levonke";

router.get('/', function(req, res, next) {
	const options = getOptions("http://localhost:8441/components/", );
	const componentsResponse = rp.get(options);
	res.render('components', {
		title: projectName + " | Components",
		componentsResponse
	});
});

router.get('/:uuid', (req, res, next) => {
	const componentResponse = componentService.getComponentByUUID(req.params.uuid);
	console.log(componentResponse);
	res.render('component', {
		title: "Levonke | " + componentResponse.uuid,
		uuid: componentResponse.uuid,
		manufacturerPartNumber: componentResponse.manufacturerPartNumber
	});
});

module.exports = router;
