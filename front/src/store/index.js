import Vue from 'vue';
import Vuex from 'vuex';
import {actions, mutations} from '@/const';
import {graphRequest} from '@/utils/graph';
import getConfigurations from '@/graphql/getConfigurations.graphql';
import getConfigurationFull from '@/graphql/getConfigurationFull.graphql';

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
			const configurations = await graphRequest(getConfigurations, {
				filter: {
					name: (filter && filter.name) ? filter.name : ''
				}
			});
			context.commit(mutations.set_has_any_configurations, !!configurations.cfgAllConfigurations.length);
			context.commit(mutations.set_main_configurations, configurations.cfgAllConfigurations);
		},
		async [actions.get_configurations](context, filter) {
			const configurations = await graphRequest(getConfigurations, {
				filter: {
					name: (filter && filter.name) ? filter.name : ''
				}
			});
			context.commit(mutations.set_main_configurations, configurations.cfgAllConfigurations);
		},
		async [actions.get_configuration](context, id) {
			const configuration = await graphRequest(getConfigurationFull, {id});
			context.commit(mutations.set_current_configuration, configuration.cfgConfiguration);
			context.commit(mutations.set_current_version, configuration.cfgConfiguration.versions[0].id);
		},
	},
	modules  : {}
});
