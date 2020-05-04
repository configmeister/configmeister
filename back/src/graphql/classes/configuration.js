import Configuration from '../../models/configuration';
import CfgVersionResolver from './version';

class CfgConfigurationResolver {
	static async createFromQuery(id) {
		return Configuration.findOne({
			where: {
				id
			}
		});
	}

	static async createFromMutation(obj) {
		const lCreate = async (o) => {
			const dbVal = await Configuration.createNew(o);
			const proms = [];
			if (o.versions) {
				o.versions.forEach(version => {
					proms.push(CfgVersionResolver.createFromMutation({
						...version,
						sourceId: dbVal.id
					}));
				});
			}

			await Promise.all(proms);
			return dbVal;
		};

		if (!obj.id) return lCreate(obj);

		const dbVal = await Configuration.findOne({
			where: {
				id: obj.id
			}
		});

		if (!dbVal) return lCreate(obj);

		if (obj.name) {
			dbVal.set('name', obj.name);
		}
		const proms = [];
		if (obj.versions) {
			obj.versions.forEach(version => {
				proms.push(CfgVersionResolver.createFromMutation({
					...version,
					sourceId: dbVal.id
				}));
			});
		}

		await Promise.all([
			dbVal.save(),
			...proms,
		]);

		return dbVal;
	}

	static async destroy(id) {
		const versions = await Configuration.getVersions(id);
		const proms = [];
		versions.forEach(version => {
			proms.push(CfgVersionResolver.destroy(version.id));
		});
		await Promise.all(proms);
		await Configuration.$destroy(id);
		return true;
	}
}

export default CfgConfigurationResolver;
