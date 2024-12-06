import { StringCalculator } from '../core/stringCalculator';

describe('String calculator sum', () => {
	it('should return 0 given null', () => {
		expect(StringCalculator.sum(null)).toBe(0);
	});

	it('should return 0 given empty string', () => {
		expect(StringCalculator.sum('')).toBe(0);
	});

	it('should return a number if given a number', () => {
		expect(StringCalculator.sum('123')).toBe(123);
	});

	it('should return 0 if given string is not a valid number', () => {
		expect(StringCalculator.sum('flower')).toBe(0);
	});

	it('should sum multiple numbers separated by commas', () => {
		expect(StringCalculator.sum('1,2,3')).toBe(6);
	});

	it('should admit any type of delimiter if given but comma by default', () => {
		expect(StringCalculator.sum('1;2;3', ';')).toBe(6);
		expect(StringCalculator.sum('1/2/3', '/')).toBe(6);
		expect(StringCalculator.sum('1,2,3')).toBe(6);
	});
});
