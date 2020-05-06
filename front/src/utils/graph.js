import axios from 'axios';
import {config} from '../const';

const graphRequest = async (query, variables = {}) => {
	console.log('Variables:', variables);
	const res = await axios.post(config.endpoints.graph, {
		query,
		variables
	});
	if (res && res.data) return res.data.data;
};

export {
	graphRequest
};
