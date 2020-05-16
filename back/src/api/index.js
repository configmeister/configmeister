import routes from './routes';

import apiConfigurationV1 from './v1/configuration';
import apiBranchV1 from './v1/branch';
import apiScalarV1 from './v1/scalar';
import apiComplexV1 from './v1/complex';
import apiUtilV1 from './v1/util';

export default async (app) => {
	await routes(app);

	await apiConfigurationV1(app, '/api/v1/configuration');
	await apiBranchV1(app, '/api/v1/branch');
	await apiScalarV1(app, '/api/v1/scalar');
	await apiComplexV1(app, '/api/v1/complex');
	await apiUtilV1(app, '/api/v1/util');

}
