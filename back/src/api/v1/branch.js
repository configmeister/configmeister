import Branch from '../../models/branch';
import ComplexValue from '../../models/complex-value';

export default async (app, prefix) => {
	app.post(`${prefix}/get-by-id`, async (request, response) => {
		const branch = await Branch.findOne({
			where: {
				id: request.body.id
			}
		});

		const scalarValues = await Branch.getScalars(branch.id);

		const complexValues = await Branch.getComplex(branch.id);

		async function parseComplexValue(complexValue) {
			const scalars = await ComplexValue.getScalars(complexValue.id);
			const complex = await ComplexValue.getComplex(complexValue.id);

			for (let i = 0; i < complex.length; i++) {
				complex[i] = await parseComplexValue(complex[i]);
			}

			return {
				...(complexValue.toJSON()),
				scalarValues : scalars.map(el => el.toJSON()),
				complexValues: complex
			};
		}

		for (let i = 0; i < complexValues.length; i++) {
			complexValues[i] = await parseComplexValue(complexValues[i]);
		}


		response.json({
			...(branch.toJSON()),
			scalarValues: scalarValues.map(el => el.toJSON()),
			complexValues
		});
	});
}
