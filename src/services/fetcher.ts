import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';

type QueryParams = { [key: string]: number | string | string[] | undefined };

export type FetcherOptions = {
	params?: QueryParams;
} & RequestInit;

const serializeParams = (params?: QueryParams) => {
	if (!params) return '';

	const queryParams: string[] = [];

	Object.entries(params).forEach(([key, value]) => {
		if (typeof value === 'string' || typeof value === 'number') {
			queryParams.push(`${key}=${value}`);
			return;
		}

		if (Array.isArray(value) && value.length) {
			queryParams.push(`${key}=${value.join(',')}`);
		}
	});

	return queryParams.length ? `?${queryParams.join('&')}` : '';
};

const getProtocol = () => {
	const isProd = process.env.VERCEL_ENV === 'production';
	if (isProd) return 'https://';
	return 'http://';
};

const getAbsoluteUrl = () => {
	// When building return WP_HOST_URL as rewrites will not work
	if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
		return process.env.WP_HOST_URL;
	}

	// When running in the browser return the origin so that rewrites work
	if (typeof window !== 'undefined') {
		return `${location.origin}/wp-api`;
	}

	// When running in the serverless function return the Vercel URL which will be the frontend URL
	const protocol = getProtocol();
	if (process.env.VERCEL_URL) {
		return `${protocol}${process.env.VERCEL_URL}/wp-api`;
	}

	throw new Error('Could not figure out absolute URL');
};

export const fetcher = async <TData>(
	pathname: string,
	options?: FetcherOptions,
): Promise<TData> => {
	const query = serializeParams(options?.params);

	const response = await fetch(`${getAbsoluteUrl()}${pathname}${query}`, options);

	const data = await response.json();

	if (response.status >= 400) {
		throw data;
	}

	return data;
};
