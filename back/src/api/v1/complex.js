import ComplexValue from '../../models/complex-value';
import ScalarValue from '../../models/scalar-value';

export default async (app, prefix) => {
	app.post(`${prefix}/upsert`, async (req, res) => {
		const complex = req.body.complex;
		if (!complex.id) {
			res.json(await ComplexValue.createNew(complex));
			return;
		}

		const dbVal = await ComplexValue.findOne({
			where: {
				id: complex.id
			}
		});
		if (!dbVal) {
			res.json(await ComplexValue.createNew(complex));
			return;
		}

		Object.entries(complex).filter(entry => entry[0] !== 'id').forEach(entry => {
			dbVal.set(entry[0], entry[1]);
		});
		await dbVal.save();
		res.json(dbVal);
	});

	app.post(`${prefix}/destroy`, async (req, res) => {

		const destroyComplex = async (id) => {
			const scalars = await ScalarValue.findAll({
				where: {
					sourceId: id
				}
			});
			const complexes = await ComplexValue.findAll({
				where: {
					sourceId: id,
				}
			});
			const proms = [];
			scalars.forEach(scalar => {
				proms.push(scalar.destroy());
			});
			complexes.forEach(complex => {
				proms.push(destroyComplex(complex.id));
			});

			await Promise.all(proms);
			await ComplexValue.destroy({
				where: {
					id
				}
			});
		};

		const id = req.body.id;
		await destroyComplex(id);
		res.json(true);
	});
}
