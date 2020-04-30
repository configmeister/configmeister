import Sequelize, {Model} from 'sequelize';
import db from '../db';

class Version extends Model {}

Version.init({
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
	modelName: 'version'
});

export default Version;
