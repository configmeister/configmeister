import Sequelize, {Model} from 'sequelize';
import {v1 as uuid} from 'uuid';
import db from '../db';
import Branch from './branch';

class Version extends Model {
	static async createNew({id, name, sourceId}) {
		return Version.create({
			id: id ? id : uuid(),
			name,
			sourceId
		});
	}

	static async getBranches(id) {
		return Branch.findAll({
			where: {
				sourceId: id
			}
		});
	}

	static async $destroy(id) {
		return Version.destroy({
			where: {id}
		});
	}
}

Version.init({
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
	modelName: 'version'
});

export default Version;
