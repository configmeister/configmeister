import Version from '../../models/version';
import CfgBranchResolver from './branch';

class CfgVersionResolver {
	static async createFromQuery(id) {
		return Version.findOne({
			where: {
				id
			}
		});
	}

	static async createFromMutation(obj) {
		const lCreate = async (o) => {
			const dbVal = await Version.createNew(o);
			const proms = [];
			if (o.branches) {
				o.branches.forEach(branch => {
					proms.push(CfgBranchResolver.createFromMutation({
						...branch,
						sourceId: dbVal.id
					}));
				});
			}

			await Promise.all(proms);
			return dbVal;
		};

		if (!obj.id) return lCreate(obj);

		const dbVal = await Version.findOne({
			where: {
				id: obj.id
			}
		});
		if (!dbVal) return lCreate(obj);

		Object.entries(obj).filter(entry => entry[0] !== 'id' && entry[0] !== 'branches').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});

		const proms = [];
		if (obj.branches) {
			obj.branches.forEach(branch => {
				proms.push(CfgBranchResolver.createFromMutation({
					...branch,
					sourceId: dbVal.id
				}));
			});
		}

		await Promise.all([
			dbVal.save(),
			...proms
		]);

		return dbVal;
	}

	static async destroy(id) {
		const branches = await Version.getBranches(id);
		const proms = branches.map(branch => CfgBranchResolver.destroy(branch.id));
		await Promise.all(proms);
		await Version.$destroy(id);
		return true;
	}
}

export default CfgVersionResolver;
