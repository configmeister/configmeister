import Sequelize, {Model} from 'sequelize';
import db from '../db';

class ComplexValueScalar extends Model {}

ComplexValueScalar.init({
	id       : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	complexId: {
		type     : Sequelize.UUID,
		allowNull: false
	},
	scalarId : {
		type     : Sequelize.UUID,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'complex_value_scalar',
});

export default ComplexValueScalar;
