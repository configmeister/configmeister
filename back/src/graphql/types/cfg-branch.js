import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgTimestamp from './cfg-timestamp';
import {CfgComplex, CfgComplexInput} from './cfg-complex';
import {CfgScalar, CfgScalarInput} from './cfg-scalar';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgBranchResolver from '../classes/branch';
import Branch from '../../models/branch';

const CfgBranch = new GraphQLObjectType({
	name  : 'CfgBranch',
	fields: {
		id           : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Id of the branch'
		},
		name         : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Name of the branch'
		},
		scalarValues : {
			type       : new GraphQLNonNull(new GraphQLList(CfgScalar)),
			description: 'Scalar values of the branch',
			resolve    : async ({id}) => {
				return Branch.getScalars(id);
			}
		},
		complexValues: {
			type       : new GraphQLNonNull(new GraphQLList(CfgComplex)),
			description: 'Complex values of the branch',
			resolve    : async ({id}) => {
				return Branch.getComplex(id);
			}
		},
		sourceId     : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'What this branch is attached to'
		},
		createdAt    : {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Created at timestamp'
		},
		updatedAt    : {
			type       : new GraphQLNonNull(CfgTimestamp),
			description: 'Updated at timestamp'
		}
	}
});

const CfgBranchInput = new GraphQLInputObjectType({
	name  : 'CfgBranchInput',
	fields: {
		id           : {
			type       : GraphQLString,
			description: 'Id. If there is such branch, itl be update if not, new branch with this id will be created'
		},
		name         : {
			type       : GraphQLString,
			description: 'Name. If updating existing branch, it is not required'
		},
		scalarValues : {
			type       : new GraphQLList(CfgScalarInput),
			description: 'An array of scalar values. They will be created automaticly if not exist',
		},
		complexValues: {
			type       : new GraphQLList(CfgComplexInput),
			description: 'An array of complex values. They will be created automaticly if not exist',
		},
		sourceId     : {
			type       : GraphQLString,
			description: 'What to attach to'
		}
	}
});

const CfgBranchQuery = new CfgBaseQuery();
CfgBranchQuery.addQuery({
	name : 'cfgBranch',
	value: {
		type       : CfgBranch,
		description: 'Get branch by id',
		args       : {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve    : async (_, {id}) => {
			return CfgBranchResolver.createFromQuery(id);
		}
	}
});
const CfgBranchMutation = new CfgBaseQuery();
CfgBranchMutation.addQuery({
	name : 'cfgBranch',
	value: {
		type       : CfgBranch,
		description: 'Create new or update existing branch',
		args       : {
			value: {
				type: new GraphQLNonNull(CfgBranchInput)
			}
		},
		resolve    : async (_, {value}) => {
			return CfgBranchResolver.createFromMutation(value);
		}
	}
});

CfgBranchMutation.addQuery({
	name : 'destroyBranch',
	value: {
		type   : GraphQLBoolean,
		args   : {
			id: {
				type       : GraphQLString,
				description: 'Branch id'
			}
		},
		resolve: async (_, {id}) => {
			return CfgBranchResolver.destroy(id);
		}
	}
});

export {
	CfgBranch,
	CfgBranchInput,
	CfgBranchQuery,
	CfgBranchMutation
};

