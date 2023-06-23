import { Inter } from 'next/font/google';
import 'normalize.css/normalize.css';
import '@/styles/global.css';

export const metadata = {
	title: 'Estate Explorer',
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
