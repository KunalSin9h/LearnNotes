export function getWordCount(text: string): number {
	const tokens = text.split(" ");

	let cnt = 0;
	for (let token of tokens) {
		if (token.length > 1) {
			cnt++;
		}
	}
	return cnt;
}
