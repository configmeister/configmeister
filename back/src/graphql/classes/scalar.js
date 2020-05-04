import ScalarValue from '../../models/scalar-value';

class CfgScalarResolver {
	static async createFromQuery(id) {
		return ScalarValue.findOne({
			where: {
				id
			}
		});
	}

	static async createFromMutation(obj) {
		if (!obj.id) {
			return ScalarValue.createNew(obj);
		}
		const dbVal = await ScalarValue.findOne({
			where: {
				id: obj.id
			}
		});

		if (!dbVal) { return ScalarValue.createNew(obj); }

		Object.entries(obj).filter(entry => entry[0] !== 'id').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});
		await dbVal.save();
		return dbVal;
	}

	static async destroy(id) {
		return ScalarValue.$destroy(id);
	}
}

export default CfgScalarResolver;
