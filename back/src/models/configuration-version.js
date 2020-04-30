import Sequelize, {Model} from 'sequelize';
import db from '../db';

class ConfigurationVersion extends Model {}

ConfigurationVersion.init({
	id             : {
		type      : Sequelize.UUID,
		primaryKey: true,
	},
	configurationId: {
		type     : Sequelize.UUID,
		allowNull: false
	},
	versionId      : {
		type     : Sequelize.UUID,
		allowNull: false
	}
}, {
	sequelize: db,
	modelName: 'configuration_version'
});

export default ConfigurationVersion;
