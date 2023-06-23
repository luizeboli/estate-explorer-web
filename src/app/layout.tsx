import { Inter } from 'next/font/google';
import 'normalize.css/normalize.css';
import './global.css';
import { css } from '@linaria/core';
import Navbar from '@/components/Navbar';

export const metadata = {
	title: 'Estate Explorer',
};

const inter = Inter({ subsets: ['latin'] });

const body = css`
	background-color: rgb(250 250 250);
`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" className={inter.className}>
			<body className={body}>
				<Navbar />
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
