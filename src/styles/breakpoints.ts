const breakpoints = {
	xs: 320,
	sm: 425,
	md: 768,
	xmd: 1024,
	lg: 1280,
	xlg: 1440,
} as const;

export const screenMinWidth = (key: keyof typeof breakpoints) =>
	`@media screen and (min-width: ${breakpoints[key]}px)`;

export default breakpoints;
