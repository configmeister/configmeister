// import {
// 	GraphQLEnumType,
// 	GraphQLInputObjectType,
// 	GraphQLList,
// 	GraphQLObjectType,
// 	GraphQLScalarType,
// 	GraphQLString,
// 	GraphQLUnionType,
// 	Kind
// } from 'graphql';
// import Scalar from './classes/scalar';
// import Complex from './classes/complex';
//
//
//
// const UValue = new GraphQLUnionType({
// 	name       : 'UValue',
// 	types      : [TScalarValue, TComplexVlaue],
// 	resolveType: (value) => {
// 		if (value instanceof Scalar) return TScalarValue;
// 		if (value instanceof Complex) return TComplexVlaue;
// 	}
// });
//
// const TBranch = new GraphQLObjectType({
// 	name  : 'TBranch',
// 	fields: {
// 		id    : {
// 			type       : GraphQLString,
// 			description: 'Id of the branch'
// 		},
// 		name  : {
// 			type       : GraphQLString,
// 			description: 'Name of the branch'
// 		},
// 		values: {
// 			type       : new GraphQLList(UValue),
// 			description: 'Values of this branch'
// 		},
//
// 		createdAt: {
// 			type       : TimestampType,
// 			description: 'Created at timestamp'
// 		},
// 		updatedAt: {
// 			type       : TimestampType,
// 			description: 'Updated at timestamp'
// 		}
// 	}
// });
//
// const TVersion = new GraphQLObjectType({
// 	name  : 'TVersion',
// 	fields: {
// 		id       : {
// 			type       : GraphQLString,
// 			description: 'Id of the version'
// 		},
// 		name     : {
// 			type       : GraphQLString,
// 			description: 'Name of the version'
// 		},
// 		branches : {
// 			type       : new GraphQLList(TBranch),
// 			description: 'Branches of this version'
// 		},
// 		createdAt: {
// 			type       : TimestampType,
// 			description: 'Created at timestamp'
// 		},
// 		updatedAt: {
// 			type       : TimestampType,
// 			description: 'Updated at timestamp'
// 		}
// 	}
// });
//
// const TConfiguration = new GraphQLObjectType({
// 	name  : 'TConfiguration',
// 	fields: {
// 		id       : {
// 			type       : GraphQLString,
// 			description: 'Id of the configuration'
// 		},
// 		name     : {
// 			type       : GraphQLString,
// 			description: 'Name of the configuration'
// 		},
// 		versions : {
// 			type       : new GraphQLList(TVersion),
// 			description: 'Versions of this configuration'
// 		},
// 		createdAt: {
// 			type       : TimestampType,
// 			description: 'Created at timestamp'
// 		},
// 		updatedAt: {
// 			type       : TimestampType,
// 			description: 'Updated at timestamp'
// 		}
// 	}
// });
//
// export {
//
// 	UValue,
//
// 	TComplexVlaue,
// 	TBranch,
// 	TVersion,
// 	TConfiguration,
//
// };
