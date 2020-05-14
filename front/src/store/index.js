import Vue from 'vue';
import Vuex from 'vuex';
import {actions, mutations} from '@/const';
// import {graphRequest} from '@/utils/graph';
// import getConfigurations from '@/graphql/getConfigurations.graphql';
// import getConfigurationFull from '@/graphql/getConfigurationFull.graphql';
import api from '@/utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
	state    : {
		user                : {
			username: 'sonyahon',
			role    : 'root'
		},
		configurations      : [],
		currentConfiguration: {},
		currentVersion      : null,
		hasAnyConfigurations: false,
	},
	mutations: {
		[mutations.set_main_configurations](state, configurations) {
			state.configurations = configurations;
		},
		[mutations.set_current_configuration](state, configuration) {
			state.currentConfiguration = configuration;
		},
		[mutations.set_current_version](state, version) {
			state.currentVersion = version;
		},
		[mutations.set_has_any_configurations](state, value) {
			state.hasAnyConfigurations = value;
		},
		[mutations.set_configuration_from_all](state, newConfiguration) {
			state.configurations.splice(state.configurations.findIndex(el => el.id === newConfiguration.id), 1, newConfiguration);
		}
	},
	actions  : {
		async [actions.init_configurations](context, filter) {
			const configurations = await api.getConfigurationsWithFilter(filter);
			context.commit(mutations.set_has_any_configurations, !!configurations.length);
			context.commit(mutations.set_main_configurations, configurations);
		},
		async [actions.get_configurations](context, filter) {
			const configurations = await api.getConfigurationsWithFilter(filter);
			context.commit(mutations.set_main_configurations, configurations);
		},
		async [actions.get_configuration](context, id) {
			const configuration = await api.getConfigurationById(id);
			context.commit(mutations.set_current_configuration, configuration);
			context.commit(mutations.set_current_version, configuration.versions[0].id);
		},
	},
	modules  : {}
});
