import { getProperties } from '@/services/api';
import { Property, WordpressPropertyQueryParams } from '@/types';
import { useMemo } from 'react';
import useSWR from 'swr';

type UseSimilarPropertiesProps = {
	baseProperty: Property;
	params?: WordpressPropertyQueryParams;
};

const useSimilarProperties = ({ baseProperty, params }: UseSimilarPropertiesProps) => {
	const taxonomyParams = useMemo<WordpressPropertyQueryParams>(() => {
		const { status, amenities } = baseProperty;

		return {
			property_status_slug: status,
			amenities_slug: amenities.map(({ slug }) => slug).join(','),
		};
	}, [baseProperty]);

	return useSWR(
		['get-similar-properties', { ...taxonomyParams, ...params, exclude: baseProperty.id }],
		([, params]) => getProperties({ params }),
	);
};
export default useSimilarProperties;
