const actions = {
	init_configurations          : 'init-configurations',
	get_configurations           : 'get-configurations',
	get_configuration            : 'get-configuration',
	update_configuration_from_all: 'update-configuration-from-all'
};
const mutations = {
	set_main_configurations   : 'set-main-configurations',
	set_current_configuration : 'set-current-configuration',
	set_current_version       : 'set-current-version',
	set_has_any_configurations: 'set-has-any-configurations',
	set_configuration_from_all: 'set-configuration-from-all'
};

const config = {
	endpoints: {
		graph: '/api/v1/graph'
	}
};

const import_type = {
	branch: 'branch'
};

export {
	actions,
	mutations,
	config,
	import_type
};
