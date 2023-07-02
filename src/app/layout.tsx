import { Inter } from 'next/font/google';
import 'normalize.css/normalize.css';
import { css } from '@linaria/core';
import Navbar from '@/components/Navbar';
import { styled } from '@linaria/react';
import { Metadata } from 'next';
import AppProviders from '@/components/AppProviders';
import ProgressBar from '@/components/ProgressBar';
import 'nprogress/nprogress.css';
import '@/styles/global.css';
import colors from '@/styles/colors';

export const metadata: Metadata = {
	title: 'Estate Explorer',
	description: 'The best place to find your new home',
	viewport: 'width=device-width, initial-scale=1',
};

const inter = Inter({ subsets: ['latin'] });

const body = css`
	display: flex;
	flex-direction: column;
	background-color: ${colors.neutral[50]};
`;

const ScrollableContainer = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	padding-bottom: 5.4rem;
`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" className={inter.className}>
			<body className={body}>
				<AppProviders>
					<ProgressBar />
					<Navbar />
					<ScrollableContainer>{children}</ScrollableContainer>
				</AppProviders>
			</body>
		</html>
	);
};

export default RootLayout;
