import ScalarValue from '../../models/scalar-value';

export default async (app, prefix) => {
	app.post(`${prefix}/upsert`, async (request, response) => {
		const scalar = request.body.scalar;
		if (!scalar.id) {
			response.json(await ScalarValue.createNew(scalar));
			return;
		}

		const dbVal = await ScalarValue.findOne({
			where: {
				id: scalar.id
			}
		});

		if (!dbVal) {
			response.json(await ScalarValue.createNew(scalar));
			return;
		}


		Object.entries(scalar).filter(entry => entry[0] !== 'id').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});
		await dbVal.save();
		response.json(dbVal);
	});

	app.post(`${prefix}/destroy`, async (req, res) => {
		await ScalarValue.$destroy(req.body.id);
		res.json(true);
	});
}
