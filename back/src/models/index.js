import ScalarValue from './scalar-value';
import ComplexValue from './complex-value';
import ComplexValueScalar from './complex-value-scalar';
import Branch from './branch';
import BranchProperty from './branch-property';
import Version from './version';
import VersionBranch from './version-branch';
import Configuration from './configuration';
import ConfigurationVersion from './configuration-version';

export default async () => {
	// Refs to complex values
	ComplexValueScalar.belongsTo(ScalarValue, {
		foreignKey: 'complexId'
	});
	ComplexValueScalar.belongsTo(ComplexValue, {
		foreignKey: 'scalarId'
	});

	// Refs to branch properties
	BranchProperty.belongsTo(Branch, {
		foreignKey: 'branchId'
	});
	BranchProperty.belongsTo(ComplexValue, {
		foreignKey: 'complexId'
	});
	BranchProperty.belongsTo(ScalarValue, {
		foreignKey: 'scalarId'
	});

	// Refs to version branches
	VersionBranch.belongsTo(Version, {
		foreignKey: 'versionId'
	});
	VersionBranch.belongsTo(Branch, {
		foreignKey: 'branchId'
	});

	// Refs to configuration versions
	ConfigurationVersion.belongsTo(Configuration, {
		foreignKey: 'configurationId'
	});
	ConfigurationVersion.belongsTo(Version, {
		foreignKey: 'versionId'
	});

	await ScalarValue.sync();
	await ComplexValue.sync();
	await ComplexValueScalar.sync();
	await Branch.sync();
	await BranchProperty.sync();
	await Version.sync();
	await VersionBranch.sync();
	await Configuration.sync();
	await ConfigurationVersion.sync();
}
