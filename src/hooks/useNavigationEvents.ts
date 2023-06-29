import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type UseNavigationEventsProps = {
	callback: Function;
};

const useNavigationEvents = ({ callback }: UseNavigationEventsProps) => {
	const pathname = usePathname();
	const [prevPathname, setPrevPathname] = useState(pathname);

	const searchParams = useSearchParams();
	const [prevSearchParams, setPrevSearchParams] = useState(searchParams);

	useEffect(() => {
		if (prevPathname !== pathname && prevSearchParams !== searchParams) return;

		callback();
	}, [pathname, prevPathname, searchParams, prevSearchParams, callback]);

	if (pathname !== prevPathname) {
		setPrevPathname(pathname);
	}

	if (searchParams !== prevSearchParams) {
		setPrevSearchParams(searchParams);
	}

	return null;
};

export default useNavigationEvents;
