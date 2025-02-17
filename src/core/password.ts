export class Password {
	private readonly value: string;

	private constructor(password: string) {
		this.value = password;
	}

	toString(): string {
		return this.value;
	}

	static create(password: string) {
		this.validatePassword(password);
		return new Password(password);
	}

	private static validatePassword(password: string) {
		if (!this.hasAtLeastSixCharacters(password)) {
			throw new Error('Password must have at least six characters');
		}

		if (!this.hasAtLeastOneNumber(password)) {
			throw new Error('Password must have at least one number');
		}

		if (!this.hasAtLeastOneUpperCaseLetter(password)) {
			throw new Error('Password must have at least one upper case letter');
		}

		if (!this.hasAtLeastOneLowerCaseLetter(password)) {
			throw new Error('Password must have at least one lower case letter');
		}

		if (!this.hasAtLeastOneUnderscore(password)) {
			throw new Error('Password must have at least one underscore');
		}
	}

	private static hasAtLeastSixCharacters(password: string) {
		return password.length >= 6;
	}

	private static hasAtLeastOneNumber(password: string) {
		return /\d/.test(password);
	}

	private static hasAtLeastOneUpperCaseLetter(password: string) {
		return /[A-Z]/.test(password);
	}

	private static hasAtLeastOneLowerCaseLetter(password: string) {
		return /[a-z]/.test(password);
	}

	private static hasAtLeastOneUnderscore(password: string) {
		return /_/.test(password);
	}
}
