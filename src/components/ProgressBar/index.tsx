'use client';

import NProgress from 'nprogress';
import useNavigationEvents from '@/hooks/useNavigationEvents';

NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
	useNavigationEvents({ callback: () => NProgress.done() });
	NProgress.start();

	return null;
};

export default ProgressBar;
