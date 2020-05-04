import path from 'path';

const appRoutes = [{
	path: '/',
}, {
	path: '/login'
}];


export default async (app) => {
	appRoutes.forEach(route => {

		app.get(route.path, (req, res) => {
			res.sendFile(path.join(__dirname, '../../../front/dist/index.html'));
		});

	});

	if (process.env !== 'production') {
		app.get('/test/*', (req, res) => {
			res.sendFile(path.join(__dirname, '../../../front/dist/index.html'));
		});
	}
}
