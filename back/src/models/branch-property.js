import Sequelize, {Model} from 'sequelize';
import db from '../db';

class BranchProperty extends Model {}

BranchProperty.init({
	id       : {
		type      : Sequelize.UUID,
		primaryKey: true,
	},
	branchId : {
		type     : Sequelize.UUID,
		allowNull: false,
	},
	complexId: {
		type     : Sequelize.UUID,
		allowNull: true
	},
	scalarId : {
		type     : Sequelize.UUID,
		allowNull: true
	}
}, {
	sequelize: db,
	modelName: 'branch_property',
});

export default BranchProperty;
