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

class Scalar {
	static async fromMutation(val) {
		if (!val.id) {
			return await Scalar.fromDb(await CreateNewScalar(val));
		}
		const res = await ScalarValue.findOne({
			where: {
				id: val.id
			}
		});
		if (!res) {
			return await Scalar.fromDb(await CreateNewScalar(val));
		}

		Object.entries(val).forEach(entry => {
			res[entry[0]] = res[entry[1]];
		});
		await res.save();
		return new Scalar(res);
	}

	static async fromDb(props) {
		return new Scalar(props);
	}

	static async fromQuery(id) {
		if (!id) return null;
		return Scalar.fromDb(await ScalarValue.findOne({
			where: {
				id
			}
		}));
	}

	constructor(props) {
		this.id = props.id || uuid();
		this.type = props.type;
		this.name = props.name;
		this.value = props.value;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}

export default Scalar;
