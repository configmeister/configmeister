import Configuration from '../../models/configuration';
import Sequelize from 'sequelize';
import Version from '../../models/version';
import Branch from '../../models/branch';

export default async (app, prefix) => {

	app.post(`${prefix}/get-all-with-filter`, async (request, response) => {
		if (!request.body.filter) {
			request.body.filter = {
				name: ''
			};
		}
		const configs = await Configuration.findAll({
			where: {
				name: {
					[Sequelize.Op.iLike]: `%${request.body.filter.name || ''}%`,
				}
			}
		});
		response.json(configs);
	});

	app.post(`${prefix}/create-new`, async (request, response) => {
		const configuration = await Configuration.createNew({
			name: request.body.name
		});
		const version = await Version.createNew({
			name    : request.body.version,
			sourceId: configuration.id
		});

		const promises = [];
		request.body.branches.forEach(branch => {
			promises.push(Branch.createNew({name: branch, sourceId: version.id}));
		});
		await Promise.all(promises);

		response.json({id: configuration.id});
	});

	app.post(`${prefix}/get-by-id`, async (request, responce) => {
		const configuration = await Configuration.findOne({
			where: {
				id: request.body.id
			}
		});

		const versions = await Configuration.getVersions(configuration.id);
		for (let i = 0; i < versions.length; i++) {
			versions[i].branches = await Version.getBranches(versions[i].id);
		}

		responce.json({
			...(configuration.toJSON()),
			versions: versions.map(el => {
				return {
					...(el.toJSON()),
					branches: el.branches,
				};
			})
		});
	});
}
