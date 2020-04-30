import Sequelize, {Model} from 'sequelize';
import db from '../db';

class ComplexValue extends Model {}

ComplexValue.init({
	id  : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	name: {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type     : Sequelize.STRING,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'complex_value'
});

export default ComplexValue;
