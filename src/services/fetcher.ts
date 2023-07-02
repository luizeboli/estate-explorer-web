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

export function getProtocol() {
	const isProd = process.env.VERCEL_ENV === 'production';
	if (isProd) return 'https://';
	return 'http://';
}

export function getAbsoluteUrl() {
	if (typeof window !== 'undefined') {
		return location.origin;
	}

	const protocol = getProtocol();
	if (process.env.VERCEL_URL) {
		return `${protocol}${process.env.VERCEL_URL}`;
	}

	throw new Error('Could not get absolute url');
}

export const fetcher = async <TData>(
	pathname: string,
	options?: FetcherOptions,
): Promise<TData> => {
	const query = serializeParams(options?.params);

	const response = await fetch(`${getAbsoluteUrl()}/wp-api${pathname}${query}`, options);
	const data = await response.json();

	if (response.status >= 400) {
		throw data;
	}

	return data;
};
