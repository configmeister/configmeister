import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {TScalarValue} from './types';
import {SCALAR_TYPE} from '../datatypes';
import Scalar from './classes/scalar';

export default new GraphQLObjectType({
	name  : 'queries',
	fields: {
		scalar: {
			type   : TScalarValue,
			args   : {
				id: {
					type       : new GraphQLNonNull(GraphQLString),
					description: 'Id of the scalar'
				}
			},
			resolve: async (obj, args, context, info) => {
				return await Scalar.fromQuery(args.id);
			}
		}
	}
});
