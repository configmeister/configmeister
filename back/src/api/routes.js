import path from 'path';
import Configuration from '../models/configuration';

const appRoutes = [{
	path: '/',
}, {
	path: '/login'
}, {
	path: '/configuration/new',
}, {
	path: '/settings'
}, {
	path: '/api-keys'
}, {
	path     : '/configuration/:id',
	resolvers: [async (req, res, next) => {
		try {
			const result = await Configuration.findOne({
				where: {
					id: req.params.id
				}
			});
			if (!result) {
				res.redirect('/404');
			} else {
				next();
			}
		} catch (e) {
			res.redirect('/404');
		}
	}]
}];


export default async (app) => {
	appRoutes.forEach(route => {

		const sendHtml = (req, res) => {
			res.sendFile(path.join(__dirname, '../../../front/dist/index.html'));
		};

		app.get(route.path, [...(route.resolvers ? route.resolvers : []), sendHtml]);

	});

	app.get('/logout', (req, res) => {
		res.redirect('/');
	});

	app.get('/404', (req, res) => {
		res.statusCode = 404;
		res.sendFile(path.join(__dirname, '../../../front/dist/index.html'));
	});
}
