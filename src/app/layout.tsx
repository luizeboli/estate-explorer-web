import { Inter } from 'next/font/google';
import 'normalize.css/normalize.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import AppProviders from '@/components/AppProviders';
import ProgressBar from '@/components/ProgressBar';
import 'nprogress/nprogress.css';
import '@/styles/styles.linaria.global';
import { Suspense } from 'react';
import colors from '@/styles/colors';
import { css } from '@linaria/core';

export const metadata: Metadata = {
	metadataBase: new URL('https://estate-explorer.felicio.dev'),
	title: 'Estate Explorer',
	description: 'The best place to find your new home',
	viewport: 'width=device-width, initial-scale=1',
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" className={inter.className}>
			<body
				className={css`
					#nprogress {
						pointer-events: none;
					}

					#nprogress .bar {
						background: ${colors.purple[500]};
						height: 4px;
					}
				`}
			>
				<AppProviders>
					<Suspense fallback={null}>
						<ProgressBar />
					</Suspense>
					<Navbar />
					<div id="scrollable-container">{children}</div>
				</AppProviders>
			</body>
		</html>
	);
};

export default RootLayout;
