'use client';

import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 1.6rem;
	margin: 0 auto;
	font-size: 1.2rem;
	max-width: 1440px;
	background-color: #fff;
	border-bottom: 1px solid #d4d4d8;

	filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
	position: sticky;
	top: 0;
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
		background-color: rgb(168 85 247);
		opacity: 0;
	}

	&:hover::after {
		opacity: 1;
	}
`;

const activeLink = css`
	background-color: rgb(243 232 255);
	color: rgb(147 51 234);
`;

const Navbar = () => {
	const pathname = usePathname();

	return (
		<Container>
			<Link href="/" aria-label="Go to home">
				<HomeIcon size={20} strokeWidth={2} />
			</Link>

			<Link href="/search" className={cx(menuItem, pathname === '/search' ? activeLink : '')}>
				Search Properties
			</Link>
		</Container>
	);
};

export default Navbar;
