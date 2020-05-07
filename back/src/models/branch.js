import Sequelize, {Model} from 'sequelize';
import {v1 as uuid} from 'uuid';
import db from '../db';
import ScalarValue from './scalar-value';
import ComplexValue from './complex-value';

class Branch extends Model {
	static async createNew({id, name, sourceId}) {
		return Branch.create({
			id: id ? id : uuid(),
			name,
			sourceId
		});
	}

	static async getScalars(id) {
		return ScalarValue.findAll({
			where: {
				sourceId: id,
			},
			order: ['name']
		});
	}

	static async getComplex(id) {
		return ComplexValue.findAll({
			where: {
				sourceId: id
			}
		});
	}

	static async $destroy(id) {
		return Branch.destroy({
			where: {
				id
			}
		});
	}
}

Branch.init({
	id      : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	name    : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	sourceId: {
		type     : Sequelize.STRING,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'branch'
});

export default Branch;
