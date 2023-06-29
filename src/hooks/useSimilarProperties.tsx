import { getProperties } from '@/services/api';
import { Property, WordpressPropertyQueryParams } from '@/types';
import { prepareTermsSlugQuery } from '@/utils/wordpress';
import useSWR from 'swr';

type UseSimilarPropertiesProps = {
	baseProperty: Property;
	params?: WordpressPropertyQueryParams;
};

const useSimilarProperties = ({ baseProperty, params }: UseSimilarPropertiesProps) => {
	const { amenities, property_status } = baseProperty;
	const termsParams = prepareTermsSlugQuery({ amenities, property_status });

	return useSWR(
		['get-similar-properties', { ...params, ...termsParams, exclude: baseProperty.id }],
		([, params]) => getProperties({ params }),
	);
};
export default useSimilarProperties;
