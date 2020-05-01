import {GraphQLEnumType} from 'graphql';

class CfgEnumBaseType {
	constructor(baseOptions, graphTypeName) {
		this.baseOptions = baseOptions;
		this.graphTypeName = graphTypeName;
		this.graphType = null;
	}

	/**
	 *
	 * @param {{
	 *      enumKey: string,
	 *      enumValue: string,
	 *      enumEntryDescription?: string
	 * }} option
	 */
	addOption(option) {
		this.baseOptions[option.enumKey] = {
			value      : option.enumValue,
			description: option.enumEntryDescription || ''
		};
	}

	/**
	 * @override
	 * @returns {GraphQLEnumType}
	 */
	get $grqphQlType() {
		if (this.graphType == null) {
			this.graphType = new GraphQLEnumType({
				name  : this.graphTypeName,
				values: {
					...this.baseOptions
				}
			});
		}
		return this.graphType;
	}
}

export default CfgEnumBaseType;
