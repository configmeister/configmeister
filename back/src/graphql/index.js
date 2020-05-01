import graphqlHTTP from 'express-graphql';
import {GraphQLSchema} from 'graphql';
import CfgQueries from './query';
import CfgMutations from './mutation';

import {CfgScalarQuery, CfgScalarMutation} from './types/cfg-scalar';

CfgScalarQuery.$appendQueries(CfgQueries);
CfgScalarMutation.$appendQueries(CfgMutations);

import {CfgComplexMutation, CfgComplexQuery} from './types/cfg-complex';

CfgComplexQuery.$appendQueries(CfgQueries);
CfgComplexMutation.$appendQueries(CfgMutations);

const schema = new GraphQLSchema({
	query   : CfgQueries.$graphQlType,
	mutation: CfgMutations.$graphQlType
});

export default async (app) => {
	app.use('/api/v1/graph', graphqlHTTP({
		schema,
		graphiql: true
	}));
}
