import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgEnumComplexType from './cfg-enum-complex-type';
import {CfgScalar, CfgScalarInput} from './cfg-scalar';
import CfgTimestamp from './cfg-timestamp';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgComplexResolver from '../classes/complex';
import ComplexValueScalar from '../../models/complex-value-scalar';
import ScalarValue from '../../models/scalar-value';

const CfgComplex = new GraphQLObjectType({
	name  : 'CfgComplex',
	fields: {
		id       : {
			type       : GraphQLString,
			description: 'Id of the complex value entry'
		},
		type     : {
			type       : CfgEnumComplexType.$grqphQlType,
			description: 'Type of the complex value entry'
		},
		name     : {
			type       : GraphQLString,
			description: 'Name of the complex value entry'
		},
		values   : {
			type       : new GraphQLList(CfgScalar),
			description: 'Array of values of this complex value',
			resolve    : async (obj) => {
				const values = await ComplexValueScalar.findAll({
					attributes: [],
					where     : {
						complexId: obj.id,
					},
					include   : [{
						model: ScalarValue,
					}]
				});

				return values.map(el => el.scalar_value);
			}
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
		id    : {
			type       : GraphQLString,
			description: 'Id. If there is such complex value, itl be update if not, new value with this id will be created'
		},
		type  : {
			type       : CfgEnumComplexType.$grqphQlType,
			description: 'Type. If updating existing value, it is not required'
		},
		name  : {
			type       : GraphQLString,
			description: 'Name. If updating existing value, it is not required'
		},
		values: {
			type       : new GraphQLList(CfgScalarInput),
			description: 'An array of scalar values. If the value exists, than it will be added directy or it will be created automaticly',
		}
	}
});

const CfgComplexQuery = new CfgBaseQuery();
CfgComplexQuery.addQuerie({
	name : 'cfgComplex',
	value: {
		type       : CfgComplex,
		args       : {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
		},
		description: 'Get scalar value by its id',
		resolve    : async (_, {id}) => {
			return CfgComplexResolver.createFromQuery(id);
		}
	}
});

const CfgComplexMutation = new CfgBaseQuery();
CfgComplexMutation.addQuerie({
	name : 'cfgComplex',
	value: {
		type       : CfgComplex,
		args       : {
			value: {
				type: CfgComplexInput
			}
		},
		description: 'Create or update complex value',
		resolve    : async (_, {value}) => {
			return CfgComplexResolver.createFromMutation(value);
		}
	}
});

export {
	CfgComplex,
	CfgComplexInput,
	CfgComplexQuery,
	CfgComplexMutation
};
