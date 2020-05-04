import CfgEnumBaseType from '../utils/cfg-enum-base-type';

class _CfgEnumScalarType extends CfgEnumBaseType {
	constructor() {
		super({
			number  : {value: 'number', description: 'Number value'},
			string : {value: 'string', description: 'String value'},
			boolean: {value: 'boolean', description: 'Boolean value'},
		}, 'CfgEnumScalarType');
	}
}

const CfgEnumScalarType = new _CfgEnumScalarType();
export default CfgEnumScalarType;
