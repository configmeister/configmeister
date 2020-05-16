export default async (app, prefix) => {
	app.post(`${prefix}/add-json`, async (request, respond) => {
		const json = request.body.json;
		const target = request.body.target;

		console.log();
	});
}
