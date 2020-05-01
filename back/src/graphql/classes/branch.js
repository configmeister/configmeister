class CfgBranchResolver {
	static async createFromQuery(id) {
		return {};
	}

	constructor(props) {
		this.id = props.id;
		this.name = props.name;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

}

export default CfgBranchResolver;
