import { Password } from '../core/password';

describe('Password', () => {
	it('should not create a password having less than six characters', () => {
		expect(() => {
			Password.create('short');
		}).toThrow('Password must have at least six characters');
	});

	it('should have at least one number', () => {
		expect(() => {
			Password.create('shorter');
		}).toThrow('Password must have at least one number');
	});

	it('should have at least one upper case letter', () => {
		expect(() => {
			Password.create('shorter1');
		}).toThrow('Password must have at least one upper case letter');
	});

	it('should have at least one lower case letter', () => {
		expect(() => {
			Password.create('SHORTER1');
		}).toThrow('Password must have at least one lower case letter');
	});

	it('should have at least one underscore', () => {
		expect(() => {
			Password.create('Shorter12');
		}).toThrow('Password must have at least one underscore');
	});
});
