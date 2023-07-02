import colors from '@/styles/colors';
import { styled } from '@linaria/react';
import Link from 'next/link';

const Container = styled.div`
	text-align: center;

	p {
		font-size: 1.6rem;
	}

	a {
		display: block;
		margin-top: 1.2rem;
		color: ${colors.purple[500]};
		font-weight: 500;
	}
`;

const Title = styled.h1``;

const NotFoundPage = () => {
	return (
		<Container>
			<Title>404 - Not Found</Title>
			<p>Could not found requested property</p>
			<p>
				<Link href="/search">View all properties</Link>
			</p>
		</Container>
	);
};

export default NotFoundPage;
