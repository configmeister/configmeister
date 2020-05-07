import {GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import CfgEnumScalarType from './cfg-enum-scalar-type';
import CfgTimestamp from './cfg-timestamp';
import CfgBaseQuery from '../utils/cfg-base-query';
import CfgScalarResolver from '../classes/scalar';

const CfgScalar = new GraphQLObjectType({
	name  : 'CfgScalar',
	fields: {
		id       : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Id of scalar value entry'
		},
		scalar   : {
			type       : new GraphQLNonNull(GraphQLBoolean),
			description: 'Scalar flag',
			resolve    : () => true
		},
		type     : {
			type       : new GraphQLNonNull(CfgEnumScalarType.$grqphQlType),
			description: 'Type of value'
		},
		name     : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Name of scalar value entry'
		},
		value    : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'JSON value of scalar value'
		},
		sourceId : {
			type       : new GraphQLNonNull(GraphQLString),
			description: 'Source id (complex, branch, etc) of this scalar'
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

const CfgScalarInput = new GraphQLInputObjectType({
	name  : 'CfgScalarInput',
	fields: {
		id      : {
			type       : GraphQLString,
			description: 'Id. If there is such scalar value, itl be update if not, new value with this id will be created'
		},
		type    : {
			type       : CfgEnumScalarType.$grqphQlType,
			description: 'Type. If updating existing value, it is not required'
		},
		name    : {
			type       : GraphQLString,
			description: 'Name. If updating existing value, it is not required'
		},
		value   : {
			type       : GraphQLString,
			description: 'JSON stringyfied real value. If updating existing value, it is not required'
		},
		sourceId: {
			type       : GraphQLString,
			description: 'What this scalar is attached to'
		}
	}
});

const CfgScalarQuery = new CfgBaseQuery();
CfgScalarQuery.addQuery({
	name : 'cfgScalar',
	value: {
		type       : CfgScalar,
		args       : {
			id: {
				type: new GraphQLNonNull(GraphQLString)
			},
		},
		description: 'Get scalar value by its id',
		resolve    : async (_, {id}) => {
			return CfgScalarResolver.createFromQuery(id);
		}
	}
});

const CfgScalarMutation = new CfgBaseQuery();
CfgScalarMutation.addQuery({
	name : 'cfgScalar',
	value: {
		type       : CfgScalar,
		args       : {
			value: {
				type: new GraphQLNonNull(CfgScalarInput)
			}
		},
		description: 'Create or update a scalar value',
		resolve    : async (_, {value}) => {
			return CfgScalarResolver.createFromMutation(value);
		}
	}
});
CfgScalarMutation.addQuery({
	name : 'destroyCfgScalar',
	value: {
		type       : GraphQLBoolean,
		args       : {
			id: {
				type       : new GraphQLNonNull(GraphQLString),
				description: 'Id of scalar to be deleted'
			}
		},
		description: 'Delete a scalar value',
		resolve    : async (_, {id}) => {
			return CfgScalarResolver.destroy(id);
		}
	}
});

export {
	CfgScalar,
	CfgScalarInput,
	CfgScalarQuery,
	CfgScalarMutation
};
