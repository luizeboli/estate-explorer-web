import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 1.6rem;
	margin: 0 auto;
	font-size: 1.2rem;
	max-width: 1440px;
	background-color: rgb(250 250 250);
	border-bottom: 1px solid #d4d4d8;

	filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
	position: sticky;
	top: 0;
`;

const menuItem = css`
	position: relative;
	font-size: 1.4rem;
	font-weight: 500;

	&::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 100%;
		height: 3px;
		transition: opacity 0.2s ease-in-out;
		background-color: rgb(168 85 247);
		opacity: 0;
	}

	&:hover::after {
		opacity: 1;
	}
`;

const Navbar = () => {
	return (
		<Container>
			<Link href="/" aria-label="Go to home">
				<HomeIcon size={20} strokeWidth={2} />
			</Link>

			<Link href="/search" className={menuItem}>
				Search Properties
			</Link>
		</Container>
	);
};

export default Navbar;
