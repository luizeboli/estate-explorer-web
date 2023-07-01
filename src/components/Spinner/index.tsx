/* eslint-disable react/require-default-props */
import { css, cx } from '@linaria/core';
import { Loader2 } from 'lucide-react';

const spinner = css`
	flex-shrink: 0;
	animation: rotate 1s linear infinite;

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

type SpinnerProps = {
	className?: string;
	size?: string | number;
};

const Spinner = ({ className = '', size = 16 }: SpinnerProps) => {
	return <Loader2 className={cx(spinner, className)} size={size} />;
};

export default Spinner;
