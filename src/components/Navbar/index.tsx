'use client';

import IconButton from '@/components/IconButton';
import breakpoints from '@/styles/breakpoints';
import colors from '@/styles/colors';
import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Wrapper = styled.div`
	background-color: #fff;
	border-bottom: 1px solid ${colors.zinc[300]};

	filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
	position: sticky;
	top: 0;
`;

const Container = styled.div`
	width: 100%;
	max-width: ${breakpoints.lg}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 1.6rem;
	margin: 0 auto;
	font-size: 1.2rem;
`;

const menuItem = css`
	position: relative;
	font-size: 1.4rem;
	font-weight: 500;
	padding: 0.8rem;
	border-radius: 0.4rem;

	&::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 100%;
		height: 3px;
		transition: opacity 0.2s ease-in-out;
		background-color: ${colors.purple[500]};
		opacity: 0;
	}

	&:hover::after {
		opacity: 1;
	}
`;

const activeLink = css`
	background-color: ${colors.purple[100]};
	color: ${colors.purple[600]};
`;

const Navbar = () => {
	const pathname = usePathname();

	return (
		<Wrapper>
			<Container>
				<IconButton as={Link} href="/" aria-label="Go to home">
					<HomeIcon size={20} strokeWidth={2} />
				</IconButton>

				<Link
					href="/search"
					className={cx(menuItem, pathname === '/search' ? activeLink : '')}
				>
					Search Properties
				</Link>
			</Container>
		</Wrapper>
	);
};

export default Navbar;
