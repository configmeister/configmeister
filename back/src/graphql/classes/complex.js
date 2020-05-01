import ComplexValue from '../../models/complex-value';
import ScalarValue from '../../models/scalar-value';
import {v1 as uuid} from 'uuid';
import ComplexValueScalar from '../../models/complex-value-scalar';
import {CreateNewScalar} from './scalar';

async function CreateComplexValue(value) {
	if (!value.id) {
		value.id = uuid();
	}

	const needed = JSON.parse(JSON.stringify(value));
	delete needed.values;

	const complexValueDb = await ComplexValue.create(needed);
	const complexValue = new CfgComplexResolver(complexValueDb);
	await complexValue.updateSelfValues(value.values);
	return complexValueDb;
}

class CfgComplexResolver {
	static async createFromQuery(id) {
		if (!id) throw new Error('Can`t get a complex value without id');
		const dbValue = await ComplexValue.findOne({
			where: {id}
		});
		return new CfgComplexResolver(dbValue);
	}

	static async createFromMutation(value) {
		if (!value.id) {
			const res = await CreateComplexValue(value);
			return new CfgComplexResolver(res);
		}
		const res = await ComplexValue.findOne({
			where: {
				id: value.id
			}
		});
		if (!res) {
			const res = await CreateComplexValue(value);
			return new CfgComplexResolver(res);
		}
		const notValuesValues = Object.entries(value).filter(entry => entry[0] !== 'values');
		notValuesValues.forEach(entry => {
			res.set(entry[0], entry[1]);
		});
		await res.save();
		const complex = new CfgComplexResolver(res);
		const values = value.values;
		if (!values) {
			return complex;
		}
		await complex.updateSelfValues(values);
		return complex;
	}

	static async removeScalar(id, scalarId) {
		await ComplexValueScalar.destroy({
			where: {
				complexId: id,
				scalarId : scalarId
			}
		});
		await ScalarValue.destroy({
			where: {
				id: scalarId
			}
		});
		const dbVal = await ComplexValue.findOne({
			where: {
				id,
			}
		});
		return new CfgComplexResolver(dbVal);
	}

	static async destroyById(id) {
		const links = await ComplexValueScalar.findAll({
			attributes: ['scalarId'],
			where     : {
				complexId: id
			}
		});
		await ComplexValueScalar.destroy({
			where: {
				complexId: id
			}
		});

		const promises = links.map(link => ScalarValue.destroy({
			where: {
				id: link.scalarId
			}
		}));
		await Promise.all(promises);

		await ComplexValue.destroy({
			where: {
				id
			}
		});

		return true;
	}

	constructor(props) {
		this.id = props.id;
		this.type = props.type;
		this.name = props.name;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	async updateSelfValues(values) {
		if (values.length === 0) return;
		let existingValues = await ComplexValueScalar.findAll({
			attributes: [],
			where     : {
				complexId: this.id
			},
			include   : [{
				model: ScalarValue,
			}]
		});
		existingValues = existingValues.map(el => el.scalar_value);

		for (let i = 0; i < values.length; i++) {
			await this.updateSelfValue(values[i], existingValues);
		}
	}

	async updateSelfValue(value, existingValues) {
		//check if scalar value exists
		if (!value.id) {
			const res = await CreateNewScalar(value);
			await ComplexValueScalar.create({
				id       : uuid(),
				complexId: this.id,
				scalarId : res.id
			});
			return;
		}
		//check if this scalar is created
		const res = await ScalarValue.findOne({
			where: {
				id: value.id
			}
		});
		if (!res) {
			const scalarDb = await CreateNewScalar(value);
			await ComplexValueScalar.create({
				id       : uuid(),
				complexId: this.id,
				scalarId : scalarDb.id
			});
			return;
		}
		if (existingValues.find(el => el.id === res.id)) {
			return;
		}
		await ComplexValueScalar.create({
			id       : uuid(),
			complexId: this.id,
			scalarId : res.id
		});
	}
}

export default CfgComplexResolver;
