export function toCamelCase(text: string) {
	const words = text.split(/[\s-_]+/);

	const capitalizedWords = words.map((word) => {
		const normalizedWord = word.toLowerCase();
		return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1);
	});

	return capitalizedWords.join('');
}
