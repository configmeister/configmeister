import {v1 as uuid} from 'uuid';
import ScalarValue from '../../models/scalar-value';

async function CreateNewScalar({id, type, name, value}) {
	if (!id) {
		id = uuid();
	}
	return ScalarValue.create({
		id,
		type,
		name,
		value
	});
}

class CfgScalarResolver {
	static async createFromQuery(id) {
		if (!id) throw new Error('Can`t get a scalar value without id');
		const dbValue = await ScalarValue.findOne({
			where: {id}
		});
		return new CfgScalarResolver(dbValue);
	}

	static async createFromMutation(value) {
		if (!value.id) {
			const res = await CreateNewScalar(value);
			return new CfgScalarResolver(res);
		}
		const res = await ScalarValue.findOne({
			where: {
				id: value.id
			}
		});
		if (!res) {
			const res = await CreateNewScalar(value);
			return new CfgScalarResolver(res);
		}
		Object.entries(value).forEach(entry => {
			res.set(entry[0], entry[1]);
		});
		await res.save();
		return new CfgScalarResolver(res);
	}

	constructor(props) {
		this.id = props.id;
		this.type = props.type;
		this.name = props.name;
		this.value = props.value;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}

export default CfgScalarResolver;
export {
	CreateNewScalar
};
