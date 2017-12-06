const index = require('./routes/index');
const about = require('./routes/about');
const users = require('./routes/users');
const components = require('./routes/components');

function router(app) {

	app.use('/', index);

	app.use('/about', about);

	app.use('/users', users);

	app.use('/component', components);

	app.use('/components', components);


}

module.exports = router;
