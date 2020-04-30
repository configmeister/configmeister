import Sequelize, {Model} from 'sequelize';
import db from '../db';

class Branch extends Model {}

Branch.init({
	id  : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	name: {
		type     : Sequelize.STRING,
		allowNull: false,
	},
}, {
	sequelize: db,
	modelName: 'branch'
});

export default Branch;
