import cors from 'cors';
// import graph from '../graphql';
import staticMiddleware from './static';
import bodyParser from 'body-parser';

export default async (app) => {
	app.use(cors());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	await staticMiddleware(app);
}
