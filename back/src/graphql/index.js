import graphqlHTTP from 'express-graphql';
import {GraphQLSchema} from 'graphql';
import query from './query';
import mutation from './mutation';


const schema = new GraphQLSchema({
	query,
	mutation
});

export default async (app) => {
	app.use('/api/v1/graph', graphqlHTTP({
		schema,
		graphiql: true
	}));
}
