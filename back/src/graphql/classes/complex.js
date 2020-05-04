import ComplexValue from '../../models/complex-value';
import CfgScalarResolver from './scalar';

class CfgComplexResolver {
	static async createFromQuery(id) {
		return ComplexValue.findOne({
			where: {
				id
			}
		});
	}

	static async createFromMutation(obj) {
		const lCreate = async (o) => {
			const dbVal = await ComplexValue.createNew(o);
			const proms = [];
			if (o.values) {
				o.values.forEach(scalar => {
					proms.push(CfgScalarResolver.createFromMutation({
						...scalar,
						sourceId: dbVal.id
					}));
				});
			}

			await Promise.all(proms);
			return dbVal;
		};

		if (!obj.id) {
			return lCreate(obj);
		}

		const dbVal = await ComplexValue.findOne({
			where: {
				id: obj.id
			}
		});

		if (!dbVal) {
			return lCreate(obj);
		}

		Object.entries(obj).filter(entry => entry[0] !== 'id' && entry[0] !== 'values').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});

		const proms = obj.values ? obj.values.map(scalar => CfgScalarResolver.createFromMutation({
			...scalar,
			sourceId: dbVal.id
		})) : [];

		await Promise.all([
			dbVal.save(),
			...proms
		]);

		return dbVal;
	}

	static async destroy(id) {
		const values = await ComplexValue.getScalars(id);
		const proms = values.map(scalar => CfgScalarResolver.destroy(scalar.id));
		await Promise.all(proms);
		await ComplexValue.$destroy(id);
		return true;
	}
}

export default CfgComplexResolver;
