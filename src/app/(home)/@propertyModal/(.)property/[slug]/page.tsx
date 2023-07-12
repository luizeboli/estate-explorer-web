'use client';

import { styled } from '@linaria/react';
import Image from 'next/image';
import HouseCoverPlaceholder from '@/assets/house-placeholder.png';
import colors from '@/styles/colors';
import Button from '@/components/Button';
import { useParams, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import useProperties from '@/hooks/useProperties';
import breakpoints, { screenMinWidth } from '@/styles/breakpoints';

const Wrapper = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1300;
	padding: 1.2rem;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	max-width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: -1;
	background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
	background-color: ${colors.neutral[100]};
	padding: 0.8rem;
	border-radius: 0.4rem;
	max-width: ${breakpoints.md}px;
`;

const Title = styled.h3`
	font-size: 1.8rem;
	margin-bottom: 1.2rem;
`;

const CoverWrapper = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 0.8rem;
	margin-bottom: 1.4rem;
	max-width: 60rem;
`;

const Actions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	${screenMinWidth('sm')} {
		flex-direction: row;
	}
`;

const InterceptedPropertyPage = () => {
	const { slug } = useParams() as { slug: string };
	const { data, isLoading } = useProperties({ params: { slug } });
	const router = useRouter();

	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			router.back();
		}
	};

	if (isLoading || !data) {
		return null;
	}

	const { title, cover } = data[0];

	return (
		<Wrapper>
			<Overlay onClick={handleOverlayClick} />
			<Content>
				<Title>{title}</Title>
				<CoverWrapper>
					<Image
						priority
						src={cover ?? HouseCoverPlaceholder}
						alt={`${title} property`}
						width={300}
						height={160}
						sizes="100vw"
						style={{
							display: 'block',
							width: '100%',
							height: 'auto',
							aspectRatio: '16/9',
							objectFit: 'cover',
						}}
					/>
				</CoverWrapper>

				<Actions>
					<Button onClick={() => router.back()}>Back</Button>
					<Button as="a" href={`/property/${slug}`} variant="contained">
						Go to property page
					</Button>
				</Actions>
			</Content>
		</Wrapper>
	);
};

export default InterceptedPropertyPage;
