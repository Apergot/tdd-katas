export class StringCalculator {
	static sum(expression: string, delimiter: string = ','): number {
		if (expression === null || expression === '') return 0;

		if (!expression.includes(delimiter)) {
			return this.parseNumber(expression);
		}

		return expression
			.split(delimiter)
			.map((potentialNum) => this.parseNumber(potentialNum))
			.reduce((acc, current) => acc + current, 0);
	}

	private static parseNumber(str: string) {
		const num = parseInt(str, 10);
		return isNaN(num) ? 0 : num;
	}
}
