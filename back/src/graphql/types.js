import {
	GraphQLEnumType,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLObjectType,
	GraphQLScalarType,
	GraphQLString,
	GraphQLUnionType,
	Kind
} from 'graphql';
import Scalar from './classes/scalar';
import Complex from './classes/complex';

function serializeDate(value) {
	if (value instanceof Date) {
		return value.getTime();
	} else if (typeof value === 'number') {
		return Math.trunc(value);
	} else if (typeof value === 'string') {
		return Date.parse(value);
	}
	return null;
}

function parseDate(value) {
	if (value === null) {
		return null;
	}

	try {
		return new Date(value);
	} catch (err) {
		return null;
	}
}

function parseDateFromLiteral(ast) {
	if (ast.kind === Kind.INT) {
		const num = parseInt(ast.value, 10);
		return new Date(num);
	} else if (ast.kind === Kind.STRING) {
		return parseDate(ast.value);
	}
	return null;
}

const TimestampType = new GraphQLScalarType({
	name        : 'Timestamp',
	description :
		'The javascript `Date` as integer. Type represents date and time ' +
		'as number of milliseconds from start of UNIX epoch.',
	serialize   : serializeDate,
	parseValue  : parseDate,
	parseLiteral: parseDateFromLiteral,
});


const EScalarType = new GraphQLEnumType({
	name  : 'EScalarType',
	values: {
		integer  : {value: 'integer'},
		float    : {value: 'float'},
		string   : {value: 'string'},
		boolean  : {value: 'boolean'},
		bignumber: {value: 'bignumber'}
	}
});

const EComplexType = new GraphQLEnumType({
	name  : 'EComplexType',
	values: {
		object: {value: 'object'},
		array : {value: 'array'}
	}
});


const TScalarValue = new GraphQLObjectType({
	name  : 'TScalarValue',
	fields: {
		id       : {
			type       : GraphQLString,
			description: 'Id of scalar value entry'
		},
		type     : {
			type       : EScalarType,
			description: 'Type of value'
		},
		name     : {
			type       : GraphQLString,
			description: 'Name of scalar value entry'
		},
		value    : {
			type       : GraphQLString,
			description: 'JSON value of scalar value'
		},
		createdAt: {
			type       : TimestampType,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : TimestampType,
			description: 'Updated at timestamp'
		}
	}
});

const IScalarValue = new GraphQLInputObjectType({
	name  : 'IScalarValue',
	fields: {
		id   : {
			type       : GraphQLString,
			description: 'Id. If there is such scalar value, itl be update if not, new value with this id will be created'
		},
		type : {
			type       : EScalarType,
			description: 'Type. If updating existing value, it is not required'
		},
		name : {
			type       : GraphQLString,
			description: 'Name. If updating existing value, it is not required'
		},
		value: {
			type       : GraphQLString,
			description: 'JSON stringified real value. If updating existing value, it is not required'
		}
	}
});

const TComplexVlaue = new GraphQLObjectType({
	name  : 'TComplexValue',
	fields: {
		id    : {
			type       : GraphQLString,
			description: 'Id of the complex value entry'
		},
		type  : {
			type       : EComplexType,
			description: 'Type of the complex value entry'
		},
		name  : {
			type       : GraphQLString,
			description: 'Name of the complex value entry'
		},
		values: {
			type       : new GraphQLList(TScalarValue),
			description: 'Array of values of this complex value'
		},

		createdAt: {
			type       : TimestampType,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : TimestampType,
			description: 'Updated at timestamp'
		}
	}
});

const UValue = new GraphQLUnionType({
	name       : 'UValue',
	types      : [TScalarValue, TComplexVlaue],
	resolveType: (value) => {
		if (value instanceof Scalar) return TScalarValue;
		if (value instanceof Complex) return TComplexVlaue;
	}
});

const TBranch = new GraphQLObjectType({
	name  : 'TBranch',
	fields: {
		id    : {
			type       : GraphQLString,
			description: 'Id of the branch'
		},
		name  : {
			type       : GraphQLString,
			description: 'Name of the branch'
		},
		values: {
			type       : new GraphQLList(UValue),
			description: 'Values of this branch'
		},

		createdAt: {
			type       : TimestampType,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : TimestampType,
			description: 'Updated at timestamp'
		}
	}
});

const TVersion = new GraphQLObjectType({
	name  : 'TVersion',
	fields: {
		id       : {
			type       : GraphQLString,
			description: 'Id of the version'
		},
		name     : {
			type       : GraphQLString,
			description: 'Name of the version'
		},
		branches : {
			type       : new GraphQLList(TBranch),
			description: 'Branches of this version'
		},
		createdAt: {
			type       : TimestampType,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : TimestampType,
			description: 'Updated at timestamp'
		}
	}
});

const TConfiguration = new GraphQLObjectType({
	name  : 'TConfiguration',
	fields: {
		id       : {
			type       : GraphQLString,
			description: 'Id of the configuration'
		},
		name     : {
			type       : GraphQLString,
			description: 'Name of the configuration'
		},
		versions : {
			type       : new GraphQLList(TVersion),
			description: 'Versions of this configuration'
		},
		createdAt: {
			type       : TimestampType,
			description: 'Created at timestamp'
		},
		updatedAt: {
			type       : TimestampType,
			description: 'Updated at timestamp'
		}
	}
});

export {
	TimestampType,

	EScalarType,
	EComplexType,

	UValue,

	TScalarValue,
	TComplexVlaue,
	TBranch,
	TVersion,
	TConfiguration,

	IScalarValue
};
