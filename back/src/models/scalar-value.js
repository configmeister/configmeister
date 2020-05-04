import Sequelize, {Model} from 'sequelize';
import {v1 as uuid} from 'uuid';
import db from '../db';

class ScalarValue extends Model {
	static async createNew({id, type, name, value, sourceId}) {
		return ScalarValue.create({
			id: id ? id : uuid(),
			type,
			name,
			value,
			sourceId
		});
	}

	static async $destroy(id) {
		await ScalarValue.destroy({
			where: {
				id
			}
		});
		return true;
	}
}

ScalarValue.init({
	id      : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	type    : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	name    : {
		type     : Sequelize.STRING,
		allowNull: false
	},
	value   : {
		type     : Sequelize.STRING,
		allowNull: false
	},
	sourceId: {
		type     : Sequelize.STRING,
		allowNull: false
	}
}, {
	sequelize: db,
	modelName: 'scalar_value'
});

export default ScalarValue;
