'use client';

import { styled } from '@linaria/react';
import type { Property } from '@/types';
import colors from '@/styles/colors';
import { PropertyContext } from './context';

const Wrapper = styled.div`
	display: block;
	position: relative;

	border-radius: 0.6rem;
	border: 1px solid ${colors.neutral[200]};

	background-color: #fff;
`;

type PropertyCardProps = React.PropsWithChildren<{
	property: Property;
}>;

const Root = ({ property, children }: PropertyCardProps) => {
	return (
		<PropertyContext.Provider value={property}>
			<Wrapper data-testid={`property-${property.id}`}>{children}</Wrapper>
		</PropertyContext.Provider>
	);
};

Root.displayName = 'PropertyCardRoot';

export { default as Cover } from './Cover';
export { default as Body } from './Body';
export { default as Footer } from './Footer';
export { default as StatusTag } from './PropertyStatusTag';
export { Root };
