import { DiseaseFilter, Case, Diagnosis } from '../core/diseaseFilter';

describe('Disease filter', () => {
	it('filters cases when several diagnosis filters are applied together', () => {
		const searchCriterion1 = 'Vías respiratorias altas';
		const searchCriterion2 = 'Cerebro';
		const patientName1 = 'Chupito';
		const patientName2 = 'Juliana';
		const cases = [createCase(1, patientName1), createCase(2, patientName2), createCase(3, 'Not relevant name')];
		const diagnoses = [
			createDiagnosis(1, searchCriterion1),
			createDiagnosis(2, searchCriterion2),
			createDiagnosis(3, 'Oídos'),
		];
		const diseaseFilter = DiseaseFilter.create(cases, diagnoses);
		diseaseFilter.addFilter(searchCriterion2);
		diseaseFilter.addFilter(searchCriterion1);

		const result = diseaseFilter.casesFiltered;

		expect(result.length).toBe(2);
		expect(result[1].patientName).toBe(patientName1);
		expect(result[0].patientName).toBe(patientName2);
	});
});

function createDiagnosis(id: number, location: string): Diagnosis {
	return {
		id,
		name: 'not relevant',
		location,
		system: 'not relevant',
		origin: 'not relevant',
		specie: 'not relevant',
	};
}

function createCase(diagnosisId: number, patientName: string): Case {
	return {
		id: 0,
		patientName,
		diagnosisId,
		diagnosisName: 'not relevant',
		publicNotes: [],
		privateNotes: [],
	};
}
