import cors from 'cors';
import graph from '../graphql';

export default async (app) => {
	app.use(cors());
	await graph(app);
}
