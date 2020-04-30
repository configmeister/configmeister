import Sequelize, {Model} from 'sequelize';
import db from '../db';

class ScalarValue extends Model {

}

ScalarValue.init({
	id   : {
		type      : Sequelize.UUID,
		primaryKey: true
	},
	type : {
		type     : Sequelize.STRING,
		allowNull: false,
	},
	name : {
		type     : Sequelize.STRING,
		allowNull: false
	},
	value: {
		type     : Sequelize.STRING,
		allowNull: false
	}
}, {
	sequelize: db,
	modelName: 'scalar_value'
});

export default ScalarValue;
