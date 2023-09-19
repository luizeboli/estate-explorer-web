'use client';

import colors from '@/styles/colors';
import { styled } from '@linaria/react';
import { useState } from 'react';
import { XCircle } from 'lucide-react';
import Button from '../Button';

const Wrapper = styled.div`
	background-color: ${colors.purple[400]};
	position: fixed;
	top: 0;
	z-index: 1300;
	width: 100%;
	padding: 1.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.2rem;
`;

const Title = styled.h1`
	font-size: 1.6rem;
	font-weight: 400;
	color: ${colors.white};
	text-align: center;
`;

const EducationalBanner = () => {
	const [showBanner, setShowBanner] = useState(true);

	if (!showBanner) return null;

	return (
		<Wrapper>
			<Title>
				Please be aware this site is a POC for using WordPress as a headless CMS. All data
				presented here is fake. This is not a real product or service.
			</Title>
			<Button variant="text" onClick={() => setShowBanner(false)}>
				<XCircle color={colors.purple[700]} />
			</Button>
		</Wrapper>
	);
};

export default EducationalBanner;
