/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */

/**
 * Getting the deepest element that contain string / match regex even when it split between multiple elements
 *
 * @see https://github.com/testing-library/dom-testing-library/issues/410#issuecomment-1536238708
 */
export function textContentMatcher(textMatch: string | RegExp) {
	const hasText =
		typeof textMatch === 'string'
			? (node: Element) => node.textContent === textMatch
			: (node: Element) => textMatch.test(node.textContent ?? '');

	const matcher = (_content: string, node: Element | null) => {
		if (!node || !hasText(node)) return false;

		return Array.from(node?.children || []).every((child) => !hasText(child));
	};

	matcher.toString = () => `textContentMatcher(${textMatch})`;

	return matcher;
}
