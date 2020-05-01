import {GraphQLObjectType} from 'graphql';
import {IScalarValue, TScalarValue} from './types';
import Scalar from './classes/scalar';

export default new GraphQLObjectType({
	name  : 'mutations',
	fields: {
		scalar: {
			type   : TScalarValue,
			args   : {
				value: {
					type: IScalarValue
				}
			},
			resolve: async (obj, args, context, info) => {
				const res = await Scalar.fromMutation(args.value);
				return res;
			}
		}
	}
});
