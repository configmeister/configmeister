import CfgEnumBaseType from '../utils/cfg-enum-base-type';

class _CfgEnumComplexType extends CfgEnumBaseType {
	constructor() {
		super({
			object: {value: 'object', description: 'JS-like object'},
			array : {value: 'array', description: 'JS-like array'}
		}, 'CfgEnumComplexType');
	}
}

const CfgEnumComplexType = new _CfgEnumComplexType();
export default CfgEnumComplexType;
