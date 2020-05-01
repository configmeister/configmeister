import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType} from 'graphql';
import CfgTimestamp from './cfg-timestamp';
import {CfgComplex, CfgComplexInput} from './cfg-complex';
import {CfgScalar, CfgScalarInput} from './cfg-scalar';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgBranchResolver from '../classes/branch';
import CfgEnumComplexType from './cfg-enum-complex-type';

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

export {
	CfgBranch,
	CfgBranchQuery
};

