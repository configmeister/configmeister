import express from 'express';
import {config} from './const';
import initMiddlewares from './middlewares';
import initApi from './api';

export default async () => {
	const app = express();

	await initMiddlewares();
	await initApi();

	return new Promise(resolve => {
		app.listen(config.server.port, config.server.host, resolve);
	});
}
