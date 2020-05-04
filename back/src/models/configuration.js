import Sequelize, {Model} from 'sequelize';
import {v1 as uuid} from 'uuid';
import db from '../db';
import Version from './version';

class Configuration extends Model {
	static async createNew({id, name}) {
		return Configuration.create({
			id: id ? id : uuid(),
			name
		});
	}

	static async getVersions(id) {
		return Version.findAll({
			where: {
				sourceId: id
			}
		});
	}

	static async $destroy(id) {
		return Configuration.destroy({
			where: {
				id
			}
		});
	}
}

Configuration.init({
	id  : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	name: {
		type     : Sequelize.STRING,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'configuration'
});

export default Configuration;
