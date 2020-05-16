import axios from 'axios';

const endpoint = {
	api_configuration: '/api/v1/configuration',
	api_branch       : '/api/v1/branch',
	api_scalar       : '/api/v1/scalar',
	api_complex      : '/api/v1/complex',
	api_util         : '/api/v1/util'
};


const api = {
	async getConfigurationsWithFilter(filter) {
		try {
			const res = await axios.post(`${endpoint.api_configuration}/get-all-with-filter`, {
				filter,
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},
	async createNewConfiguration(name, version, branches) {
		try {
			const res = await axios.post(`${endpoint.api_configuration}/create-new`, {
				name,
				version,
				branches
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},
	async getConfigurationById(id) {
		try {
			const res = await axios.post(`${endpoint.api_configuration}/get-by-id`, {
				id
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},

	async getBranchById(id) {
		try {
			const res = await axios.post(`${endpoint.api_branch}/get-by-id`, {
				id
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},

	async upsertScalar(scalar) {
		try {
			const res = await axios.post(`${endpoint.api_scalar}/upsert`, {
				scalar
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},
	async destroyScalar(id) {
		try {
			const res = await axios.post(`${endpoint.api_scalar}/destroy`, {
				id,
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},

	async upsertComplex(complex) {
		try {
			const res = await axios.post(`${endpoint.api_complex}/upsert`, {
				complex
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},
	async destroyComplex(id) {
		try {
			const res = await axios.post(`${endpoint.api_complex}/destroy`, {
				id
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	},
	async importJSON(json, target) {
		try {
			const res = await axios.post(`${endpoint.api_util}/add-json`, {
				json,
				target
			});
			return res.data;
		} catch (e) {
			console.log(e);
		}
	}
};

export default api;
export {
	endpoint
};
