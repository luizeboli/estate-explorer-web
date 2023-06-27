export const fetcher = <TData>(pathname: string, options?: RequestInit): Promise<TData> =>
	fetch(`${process.env.NEXT_PUBLIC_WP_HOST}${pathname}`, options).then((res) => res.json());
