'use client';

// import { ContentWrapper } from '@/app/(home)/page';
import Button from '@/components/Button';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

const Text = styled.p`
	font-size: 1.4rem;
	text-align: center;
`;

const button = css`
	align-self: center;
	margin-top: 1.2rem;
`;

const ErrorPage = ({ reset }: { reset: () => void }) => {
	return (
		<>
			<Text>Something wrong happened while trying to fetch properties</Text>
			<Button onClick={() => reset()} className={button}>
				Try again
			</Button>
		</>
	);
};

export default ErrorPage;
