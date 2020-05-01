class CfgBaseQuery {
	constructor() {
		this.queries = [];
	}

	addQuerie(querie) {
		this.queries.push(querie);
	}

	$appendQueries(instance) {
		this.queries.forEach(querie => {
			instance.addField(querie);
		});
	}
}

export default CfgBaseQuery;
