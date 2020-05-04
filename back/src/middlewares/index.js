import cors from 'cors';
import graph from '../graphql';
import staticMiddleware from './static';

export default async (app) => {
	app.use(cors());
	await graph(app);
	await staticMiddleware(app);
}
