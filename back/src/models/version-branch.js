import Sequelize, {Model} from 'sequelize';
import db from '../db';

class VersionBranch extends Model {}

VersionBranch.init({
	id       : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	versionId: {
		type     : Sequelize.UUID,
		allowNull: false,
	},
	branchId : {
		type     : Sequelize.UUID,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'version_branch'
});

export default VersionBranch;
