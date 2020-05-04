class CfgBaseQuery {
	constructor() {
		this.queries = [];
	}

	addQuery(query) {
		this.queries.push(query);
	}

	$appendQueries(instance) {
		this.queries.forEach(query => {
			instance.addField(query);
		});
	}
}

export default CfgBaseQuery;
