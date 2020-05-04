import routes from './routes';

export default async (app) => {
	await routes(app);
}
