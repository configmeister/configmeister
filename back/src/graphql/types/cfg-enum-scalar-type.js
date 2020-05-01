import CfgEnumBaseType from '../utils/cfg-enum-base-type';

class _CfgEnumScalarType extends CfgEnumBaseType {
	constructor() {
		super({
			integer: {value: 'integer', description: 'Integer value'},
			float  : {value: 'float', description: 'Float value'},
			string : {value: 'string', description: 'String value'},
			boolean: {value: 'boolean', description: 'Boolean value'},
		}, 'CfgEnumScalarType');
	}
}

const CfgEnumScalarType = new _CfgEnumScalarType();
export default CfgEnumScalarType;
