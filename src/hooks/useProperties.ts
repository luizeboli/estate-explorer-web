import { getProperties } from '@/services/api';
import type { WordpressPropertyQueryParams } from '@/types/wordpress';
import useSWR from 'swr';

type UsePropertiesProps = {
	params?: WordpressPropertyQueryParams;
};

const useProperties = ({ params }: UsePropertiesProps) => {
	return useSWR(['get-properties', { ...params }], ([, params]) => getProperties({ params }));
};
export default useProperties;
