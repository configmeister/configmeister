import Sequelize, {Model} from 'sequelize';
import db from '../db';

class Configuration extends Model {}

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
