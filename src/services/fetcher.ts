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

export const fetcher = async <TData>(
	pathname: string,
	options?: FetcherOptions,
): Promise<TData> => {
	const query = serializeParams(options?.params);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WP_HOST_URL}${pathname}${query}`,
		options,
	);

	const data = await response.json();

	if (response.status >= 400) {
		throw JSON.stringify(data);
	}

	return data;
};
