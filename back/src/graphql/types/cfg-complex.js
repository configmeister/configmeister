import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgEnumComplexType from './cfg-enum-complex-type';
import {CfgScalar, CfgScalarInput} from './cfg-scalar';
import CfgTimestamp from './cfg-timestamp';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgComplexResolver from '../classes/complex';
import ComplexValue from '../../models/complex-value';

const CfgComplex = new GraphQLObjectType({
	name  : 'CfgComplex',
	fields: {
		id       : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Id of the complex value entry'
		},
		type     : {
			type       : new GraphQLNonNull(CfgEnumComplexType.$grqphQlType),
			description: 'Type of the complex value entry'
		},
		name     : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Name of the complex value entry'
		},
		values   : {
			type       : new GraphQLNonNull(new GraphQLList(CfgScalar)),
			description: 'Array of values of this complex value',
			resolve    : async (obj) => {
				return ComplexValue.getScalars(obj.id);
			}
		},
		sourceId : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'What this complex value is attached to'
		},
		createdAt: {
			type       : CfgTimestamp,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : CfgTimestamp,
			description: 'Updated at timestamp'
		}
	}
});

const CfgComplexInput = new GraphQLInputObjectType({
	name  : 'CfgComplexInput',
	fields: {
		id      : {
			type       : GraphQLString,
			description: 'Id. If there is such complex value, itl be update if not, new value with this id will be created'
		},
		type    : {
			type       : CfgEnumComplexType.$grqphQlType,
			description: 'Type. If updating existing value, it is not required'
		},
		name    : {
			type       : GraphQLString,
			description: 'Name. If updating existing value, it is not required'
		},
		values  : {
			type       : new GraphQLList(CfgScalarInput),
			description: 'An array of scalar values. If the value exists, than it will be added directy or it will be created automaticly',
		},
		sourceId: {
			type       : GraphQLString,
			description: 'What this complex value is attached to'
		}
	}
});

const CfgComplexQuery = new CfgBaseQuery();
CfgComplexQuery.addQuery({
	name : 'cfgComplex',
	value: {
		type       : CfgComplex,
		args       : {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
		},
		description: 'Get complex value by its id',
		resolve    : async (_, {id}) => {
			return CfgComplexResolver.createFromQuery(id);
		}
	}
});

const CfgComplexMutation = new CfgBaseQuery();
CfgComplexMutation.addQuery({
	name : 'cfgComplex',
	value: {
		type       : CfgComplex,
		args       : {
			value: {
				type: new GraphQLNonNull(CfgComplexInput),
			}
		},
		description: 'Create or update complex value',
		resolve    : async (_, {value}) => {
			return CfgComplexResolver.createFromMutation(value);
		}
	}
});

CfgComplexMutation.addQuery({
	name : 'destroyCfgComplex',
	value: {
		type       : GraphQLBoolean,
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'Id of complex to be destroyed'
			}
		},
		description: 'Destroy a complex by id',
		resolve    : async (_, {id}) => {
			return CfgComplexResolver.destroy(id);
		}
	}
});

export {
	CfgComplex,
	CfgComplexInput,
	CfgComplexQuery,
	CfgComplexMutation
};
