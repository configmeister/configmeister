import Sequelize, {Model} from 'sequelize';
import {v1 as uuid} from 'uuid';
import db from '../db';
import ScalarValue from './scalar-value';

class ComplexValue extends Model {
	static async createNew({id, name, type, sourceId}) {
		return ComplexValue.create({
			id: id ? id : uuid(),
			name,
			type,
			sourceId
		});
	}

	static async getScalars(id) {
		return ScalarValue.findAll({
			where: {
				sourceId: id,
			}
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
		return ComplexValue.destroy({
			where: {
				id
			}
		});
	}
}

ComplexValue.init({
	id      : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	name    : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	type    : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	sourceId: {
		type     : Sequelize.STRING,
		allowNull: false
	}
}, {
	sequelize: db,
	modelName: 'complex_value'
});

export default ComplexValue;
