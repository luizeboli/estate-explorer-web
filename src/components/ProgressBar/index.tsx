'use client';

import NProgress from 'nprogress';
import useNavigationEvents from '@/hooks/useNavigationEvents';

NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
	useNavigationEvents({ callback: () => NProgress.done() });

	if (typeof window !== 'undefined') {
		NProgress.start();
	}

	return null;
};

export default ProgressBar;
