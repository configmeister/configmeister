import initServer from './server';
import initModels from './models';
import {config} from './const';

(async () => {
	await initModels();
	await initServer();
	console.log(`Server started on ${config.server.host}:${config.server.port}`);
})();
