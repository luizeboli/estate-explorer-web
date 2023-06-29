import { Property } from '@/types';
import { createContext, useContext } from 'react';

export const PropertyContext = createContext<Property>(undefined as unknown as Property);

export const usePropertyContext = () => {
	const context = useContext(PropertyContext);

	if (typeof context === 'undefined') {
		throw new Error('usePropertyContext must be used within a PropertyContext.Provider');
	}

	return context;
};
