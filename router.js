const index = require('./routes/indexController');

const login = require('./routes/loginController');
const join = require('./routes/joinController');

const settings = require('./routes/settingsController');

const status = require('./routes/statusController');
const help = require('./routes/helpController');
const contact = require('./routes/contactController');
const api = require('./routes/apiController');
const about = require('./routes/aboutController');

const search = require('./routes/searchController');

const user = require('./routes/userController');
const users = require('./routes/usersController');
const organization = require('./routes/organizationController');
const organizations = require('./routes/organizationsController');
const team = require('./routes/teamController');
const teams = require('./routes/teamsController');
const project = require('./routes/projectController');
const projects = require('./routes/projectsController');
const version = require('./routes/versionController');
const versions = require('./routes/versionsController');
const component = require('./routes/componentController');
const components = require('./routes/componentsController');
const manufacturer = require('./routes/manufacturerController');
const manufacturers = require('./routes/manufacturersController');

function router(app) {
	app.use('/', index);

	app.use('/join', join);
	app.use('/login', login);

	app.use('/settings', settings);

	app.use('/status', status);
	app.use('/help', help);
	app.use('/contact', contact);
	app.use('/api', api);
	app.use('/about', about);

	app.use('/search', search);

	app.use('/user', user);
	app.use('/users', users);
	app.use('/organization', organization);
	app.use('/organizations', organizations);
	app.use('/team', team);
	app.use('/teams', teams);
	// app.use('/project', project);
	// app.use('/projects', projects);
	// app.use('/version', version);
	// app.use('/versions', versions);
	app.use('/component', component);
	app.use('/components', components);
	app.use('/manufacturer', manufacturer);
	app.use('/manufacturers', manufacturers);
}

module.exports = router;
