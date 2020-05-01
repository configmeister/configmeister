import {GraphQLObjectType} from 'graphql';

class CfgGraphInjection {
	constructor(name) {
		this.name = name;
		this.fields = {};
	}

	/**
	 *
	 * @param {{
	 *     name: string,
	 *     value: {
	 *         type,
	 *         args: {},
	 *         resolve: function,
	 *         description
	 *     }
	 * }} field
	 */
	addField(field) {
		this.fields[field.name] = field.value;
	}

	get $graphQlType() {
		return new GraphQLObjectType({
			name  : this.name,
			fields: {
				...this.fields,
			}
		});
	}
}

export default CfgGraphInjection;
