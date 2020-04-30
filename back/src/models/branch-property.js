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
	validate : {
		scalarOrComplexIsNotNull() {
			if ((this.scalarId === null && this.complexId === null) || (this.scalarId !== null && this.complexId !== null)) {
				throw new Error('Only one of scalarId or complexId must be not null');
			}
		}
	},
});

export default BranchProperty;
