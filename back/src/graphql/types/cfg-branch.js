import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType} from 'graphql';
import CfgTimestamp from './cfg-timestamp';
import {CfgComplex, CfgComplexInput} from './cfg-complex';
import {CfgScalar, CfgScalarInput} from './cfg-scalar';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgBranchResolver from '../classes/branch';

const CfgBranch = new GraphQLObjectType({
	name  : 'CfgBranch',
	fields: {
		id           : {
			type       : GraphQLString,
			description: 'Id of the branch'
		},
		name         : {
			type       : GraphQLString,
			description: 'Name of the branch'
		},
		scalarValues : {
			type       : new GraphQLList(CfgScalar),
			description: 'Scalar values of the branch',
			resolve    : async ({id}) => {}
		},
		complexValues: {
			type       : new GraphQLList(CfgComplex),
			description: 'Complex values of the branch',
			resolve    : async ({id}) => {}
		},
		createdAt    : {
			type       : CfgTimestamp,
			description: 'Created at timestamp'
		},
		updatedAt    : {
			type       : CfgTimestamp,
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
		}
	}
});

const CfgBranchQuery = new CfgBaseQuery();
CfgBranchQuery.addQuerie({
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
CfgBranchMutation.addQuerie({
	name : 'cfgBranch',
	value: {
		type       : CfgBranch,
		description: 'Create new or update existing branch',
		args       : {
			branch: {
				type: CfgBranchInput
			}
		},
		resolve    : async (_, {branch}) => {
			return CfgBranchResolver.createFromMutation(branch);
		}
	}
});
CfgBranchMutation.addQuerie({
	name : 'removeScalarFromBranch',
	value: {
		type       : GraphQLBoolean,
		description: 'Remove scalar from branch (also deletes scalar)',
		args       : {
			branchId: {
				type       : GraphQLString,
				description: 'Branch id to remove from'
			},
			id      : {
				type       : GraphQLString,
				description: 'Scalar id to remove'
			}
		},
		resolve    : async (_, {branchId, id}) => {
			return CfgBranchResolver.removeScalar(branchId, id);
		}
	}
});

CfgBranchMutation.addQuerie({
	name : 'removeComplexFromBranch',
	value: {
		type       : GraphQLBoolean,
		description: 'Remove complex value from branch (also deletes complex)',
		args       : {
			branchId: {
				type       : GraphQLString,
				description: 'Branch id to remove from'
			},
			id      : {
				type       : GraphQLString,
				description: 'Complex id to remove'
			}
		},
		resolve    : async (_, {branchId, id}) => {
			return CfgBranchResolver.removeComplex(branchId, id);
		}
	}
});

CfgBranchMutation.addQuerie({
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

