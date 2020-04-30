import Sequelize from 'sequelize';
import {config} from './const';

const db = new Sequelize(config.db.name, config.db.user, config.db.password, {
	host   : config.db.host,
	port   : config.db.port,
	dialect: 'postgres'
});

export default db;
