import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgTimestamp from './cfg-timestamp';
import {CfgBranch, CfgBranchInput} from './cfg-branch';
import Version from '../../models/version';
import CfgVersionResolver from '../classes/version';


const CfgVersion = new GraphQLObjectType({
	name  : 'CfgVersion',
	fields: {
		id       : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Id of the version',
		},
		name     : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Name of the version'
		},
		sourceId : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'What is this version attached to'
		},
		createdAt: {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Updated at timestamp'
		},
		branches : {
			type       : new GraphQLList(CfgBranch),
			description: 'Branches of this version',
			resolve    : async ({id}) => {
				return Version.getBranches(id);
			}
		}
	}
});

const CfgVersionInput = new GraphQLInputObjectType({
	name  : 'CfgVersionInput',
	fields: {
		id      : {
			type       : GraphQLString,
			description: 'Id. If there is such version, itl be update if not, new value with this id will be created'
		},
		name    : {
			type       : GraphQLString,
			description: 'Name. If updating existing value, it is not required'
		},
		sourceId: {
			type       : GraphQLString,
			description: 'What this version is attached to'
		},
		branches: {
			type       : new GraphQLList(CfgBranchInput),
			description: 'Branches to attach'
		}
	}
});

const CfgVersionQuery = new CfgBaseQuery();
CfgVersionQuery.addQuery({
	name : 'cfgVersion',
	value: {
		type       : CfgVersion,
		description: 'Get version by id',
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'Id of the version'
			}
		},
		resolve    : async (_, {id}) => {
			return CfgVersionResolver.createFromQuery(id);
		}
	}
});

const CfgVersionMutation = new CfgBaseQuery();
CfgVersionMutation.addQuery({
	name : 'cfgVersion',
	value: {
		type       : CfgVersion,
		description: 'Creat or update version',
		args       : {
			value: {
				type       : new GraphQLNonNull(CfgVersionInput),
				description: 'Version'
			}
		},
		resolve   : async (_, {value}) => {
			return CfgVersionResolver.createFromMutation(value);
		}
	}
});

CfgVersionMutation.addQuery({
	name : 'destroyCfgVersion',
	value: {
		type       : GraphQLBoolean,
		description: 'Remove version',
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'ID of the version tto be removed'
			}
		},
		resolve    : async (_, {id}) => {
			return CfgVersionResolver.destroy(id);
		}
	}
});

export {
	CfgVersion,
	CfgVersionInput,
	CfgVersionQuery,
	CfgVersionMutation
};
