import Branch from '../../models/branch';
import CfgScalarResolver from './scalar';
import CfgComplexResolver from './complex';

class CfgBranchResolver {
	static async createFromQuery(id) {
		return Branch.findOne({
			where: {
				id
			}
		});
	}

	static async createFromMutation(obj) {
		const lCreate = async (o) => {
			const dbVal = await Branch.createNew(o);
			const proms = [];
			if (o.scalarValues) {
				o.scalarValues.forEach(scalar => {
					proms.push(CfgScalarResolver.createFromMutation({
						...scalar,
						sourceId: dbVal.id
					}));
				});
			}
			if (o.complexValues) {
				o.complexValues.forEach(complex => {
					proms.push(CfgComplexResolver.createFromMutation({
						...complex,
						sourceId: dbVal.id
					}));
				});
			}
			await Promise.all(proms);
			return dbVal;
		};

		if (!obj.id) return lCreate(obj);

		const dbVal = await Branch.findOne({
			where: {id: obj.id}
		});

		if (!dbVal) return lCreate(obj);

		Object.entries(obj).filter(entry => entry[0] !== 'id' && entry[0] !== 'scalarValues' && entry[0] !== 'complexValues').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});
		const proms = [];
		if (obj.scalarValues) {
			obj.scalarValues.forEach(scalar => {
				proms.push(CfgScalarResolver.createFromMutation({
					...scalar,
					sourceId: dbVal.id
				}));
			});
		}
		if (obj.complexValues) {
			obj.complexValues.forEach(complex => {
				proms.push(CfgComplexResolver.createFromMutation({
					...complex,
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
		const proms = [];
		const scalars = await Branch.getScalars(id);
		scalars.forEach(scalar => {
			proms.push(CfgScalarResolver.destroy(scalar.id));
		});
		const complexes = await Branch.getComplex(id);
		complexes.forEach(complex => {
			proms.push(CfgComplexResolver.destroy(complex.id));
		});
		await Promise.all(proms);
		await Branch.$destroy(id);
		return true;
	}
}

export default CfgBranchResolver;
