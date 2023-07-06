import colors from '@/styles/colors';
import { css } from '@linaria/core';

export const globals = css`
	:global() {
		html,
		body {
			max-width: 100vw;
			height: 100vh;
			overflow: hidden;
			font-size: 10px;
		}

		body {
			display: flex;
			flex-direction: column;
			background-color: ${colors.neutral[50]};
		}

		#scrollable-container {
			overflow-y: auto;
			overflow-x: hidden;
			padding-bottom: 5.4rem;
		}

		li {
			list-style: none;
		}

		a {
			text-decoration: none;
			color: inherit;
		}

		button {
			border: none;
			background: none;
			appearance: none;
			cursor: pointer;
			outline: none;
		}

		fieldset {
			border: none;
			padding: 0;
		}

		* {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
		}

		h1 {
			padding: 0;
			margin: 0;
		}
	}
`;
