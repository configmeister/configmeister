import {v1 as uuid} from 'uuid';
import Branch from '../../models/branch';
import CfgScalarResolver from './scalar';
import BranchProperty from '../../models/branch-property';
import CfgComplexResolver from './complex';
import ScalarValue from '../../models/scalar-value';
import ComplexValue from '../../models/complex-value';

async function CreateNewBranch(branch) {
	let {
		id,
		name,
		scalarValues,
		complexValues,
	} = branch;
	id = id ? id : uuid();

	const dbBranch = await Branch.create({
		id,
		name
	});

	const branchResolver = new CfgBranchResolver(dbBranch);
	await branchResolver.addScalars(scalarValues);
	await branchResolver.addComplexes(complexValues);
	return branchResolver;
}

class CfgBranchResolver {
	static async createFromQuery(id) {
		return {
			id
		};
	}

	static async createFromMutation(branch) {
		if (!branch.id) {
			return CreateNewBranch(branch);
		}
		const id = branch.id;
		const res = await Branch.findOne({
			where: {
				id
			}
		});
		if (!res) {
			return CreateNewBranch(branch);
		}
		if (branch.name) {
			res.set('name', branch.name);
			await res.save();
		}
		const br = new CfgBranchResolver(res);
		await br.updateScalars(branch.scalarValues);
		await br.updateComplexes(branch.complexValues);
		return br;
	}

	static async removeScalar(branchId, id) {

	}

	static async removeComplex(branchId, id) {

	}

	static async destroy(id) {

	}

	constructor(props) {
		this.id = props.id;
		this.name = props.name;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	async addScalars(scalars = []) {
		if (!scalars.length) return;
		const proms = scalars.map(scalar => this.addScalar(scalar));
		await Promise.all(proms);
	}

	async addComplexes(complexes) {
		if (!complexes.length) return;
		const proms = complexes.map(complex => this.addComplex(complex));
		await Promise.all(proms);
	}

	async addScalar(scalar) {
		const sc = await CfgScalarResolver.createFromMutation(scalar);
		return BranchProperty.create({
			id      : uuid(),
			branchId: this.id,
			scalarId: sc.id
		});
	}

	async addComplex(complex) {
		const compl = await CfgComplexResolver.createFromMutation(complex);
		return BranchProperty.create({
			id       : uuid(),
			branchId : this.id,
			complexId: compl.id
		});
	}

	async updateScalars(scalars) {
		let existingScalars = await BranchProperty.findAll({
			where     : {
				branchId: this.id
			},
			attributes: [],
			include   : [{
				model: ScalarValue
			}]
		});
		existingScalars = existingScalars.map(el => el.scalar_value);
		const proms = scalars.map(scalar => this.updateScalar(scalar, existingScalars));
		await Promise.all(proms);
	}

	async updateScalar(scalar, existingScalars) {
		if (!scalar.id || !(await ScalarValue.findOne({where: {id: scalar.id}}))) {
			const sc = await CfgScalarResolver.createFromMutation(scalar);
			return BranchProperty.create({
				id      : uuid(),
				branchId: this.id,
				scalarId: sc.id
			});
		}

		if (existingScalars.find(el => el.id === scalar.id)) return;

		return BranchProperty.create({
			id      : uuid(),
			branchId: this.id,
			scalarId: scalar.id
		});
	}

	async updateComplexes(complexes) {
		let existingComplexes = await BranchProperty.findAll({
			where     : {
				branchId: this.id
			},
			attributes: [],
			include   : [{
				model: ComplexValue
			}]
		});
		existingComplexes = existingComplexes.map(el => el.complex_value);
		const proms = complexes.map(complex => this.updateComplex(complex, existingComplexes));
		await Promise.all(proms);
	}

	async updateComplex(complex, existingComplexes) {
		if (!complex.id || !(await ComplexValue.findOne({where: {id: complex.id}}))) {
			const compl = await CfgComplexResolver.createFromMutation(complex);
			return BranchProperty.create({
				id       : uuid(),
				branchId : this.id,
				complexId: compl.id
			});
		}

		if (existingComplexes.find(el => el.id === complex.id)) return;

		return BranchProperty.create({
			id       : uuid(),
			branchId : this.id,
			complexId: complex.id
		});
	}
}

export default CfgBranchResolver;
