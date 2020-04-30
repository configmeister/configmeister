import graphqlHTTP from 'express-graphql';
import {GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLEnumType, GraphQLUnionType, GraphQLInt, GraphQLFloat, GraphQLBoolean,} from 'graphql';

const fakeDb = {
	'123': {
		id   : '123',
		type : 'string',
		name : 'proxyCount',
		value: '1'
	}
};

const ScalarTypeEnum = new GraphQLEnumType({
	name  : 'EScalarType',
	values: {
		integer: {value: 'integer'},
		float  : {value: 'float'},
		string : {value: 'string'},
		boolean: {value: 'boolean'}
	}
});

const ScalarValueUnionType = new GraphQLUnionType({
	name : 'TScalarValueValue',
	types: [
		GraphQLInt,
		GraphQLFloat,
		GraphQLString,
		GraphQLBoolean,
	],
	resolveType(value) {
		switch (value.type) {
			case 'integer':
				return GraphQLInt;
			case 'float':
				return GraphQLFloat;
			case 'string':
				return GraphQLString;
			case 'boolean':
				return GraphQLBoolean;
		}
	}
})

const ScalarValue = new GraphQLObjectType({
	name  : 'TScalarValue',
	fields: {
		id   : {
			type       : GraphQLString,
			description: 'Id of scalar value entry'
		},
		type : {
			type       : ScalarTypeEnum,
			description: 'Type of value'
		},
		name : {
			type       : GraphQLString,
			description: 'Name of scalar value entry'
		},
		value: {
			type: ScalarValueUnionType,
			description: 'Value of scalar value'
		}
	}
});

const QueryType = new GraphQLObjectType({
	name  : 'Query',
	fields: {
		scalar: {
			type   : ScalarValue,
			args   : {
				id: {
					type: GraphQLString,
				}
			},
			resolve: (a, {id}) => {
				console.log(a);
				console.log(id);
				return fakeDb[id];
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: QueryType
});

export default async (app) => {
	app.use('/api/v1/graph', graphqlHTTP({
		schema,
		graphiql: true
	}));
}
