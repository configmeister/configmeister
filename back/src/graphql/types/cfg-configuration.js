import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgTimestamp from './cfg-timestamp';
import {CfgVersion, CfgVersionInput} from './cfg-version';
import Configuration from '../../models/configuration';
import CfgConfigurationResolver from '../classes/configuration';

const CfgConfiguration = new GraphQLObjectType({
	name  : 'CfgConfiguration',
	fields: {
		id       : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Id of the configuration'
		},
		name     : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Name of the configuration'
		},
		versions : {
			type       : new GraphQLList(new GraphQLNonNull(CfgVersion)),
			description: 'Versions of the configuration',
			resolve    : async ({id}) => {
				return Configuration.getVersions(id);
			}
		},
		createdAt: {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Updated at timestamp'
		}
	}
});

const CfgConfigurationInput = new GraphQLInputObjectType({
	name  : 'CfgConfigurationInput',
	fields: {
		id      : {
			type       : GraphQLString,
			description: 'Id of the configuration'
		},
		name    : {
			type       : GraphQLString,
			description: 'Name  of the configuration'
		},
		versions: {
			type       : new GraphQLList(CfgVersionInput),
			description: 'Versions attached to the configuration'
		}
	}
});

const CfgConfigurationInputFilter = new GraphQLInputObjectType({
	name  : 'CfgConfigurationInputFilter',
	fields: {
		name: {
			type       : GraphQLString,
			description: 'Name of the configuration'
		}
	}
});

const CfgConfigurationQuery = new CfgBaseQuery();
CfgConfigurationQuery.addQuery({
	name : 'cfgConfiguration',
	value: {
		type       : CfgConfiguration,
		description: 'Get configuration by id',
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'Id of the configuration'
			}
		},
		resolve    : async (_, {id}) => {
			return CfgConfigurationResolver.createFromQuery(id);
		}
	}
});

CfgConfigurationQuery.addQuery({
	name : 'cfgAllConfigurations',
	value: {
		type       : new GraphQLList(CfgConfiguration),
		description: 'Get configurations',
		args       : {
			filter: {
				type       : CfgConfigurationInputFilter,
				description: 'Options to filter through'
			}
		},
		resolve    : async (_, {filter}) => {
			console.log('Filter', filter);
			if (!filter) filter = {};
			return CfgConfigurationResolver.getAll(filter);
		}
	}
});


const CfgConfigurationMutation = new CfgBaseQuery();
CfgConfigurationMutation.addQuery({
	name : 'cfgConfiguration',
	value: {
		type       : CfgConfiguration,
		description: 'Create or update configuration',
		args       : {
			value: {
				type       : new GraphQLNonNull(CfgConfigurationInput),
				description: 'Configuration template'
			}
		},
		resolve    : async (_, {value}) => {
			return CfgConfigurationResolver.createFromMutation(value);
		}
	}
});
CfgConfigurationMutation.addQuery({
	name : 'destroyCfgConfiguration',
	value: {
		type       : GraphQLBoolean,
		description: 'Destroy configuration',
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'Id of the configuration to be deleted'
			}
		},
		resolve    : async (_, {id}) => {
			return CfgConfigurationResolver.destroy(id);
		}
	}
});


export {
	CfgConfiguration,
	CfgConfigurationInput,
	CfgConfigurationInputFilter,
	CfgConfigurationQuery,
	CfgConfigurationMutation
};
