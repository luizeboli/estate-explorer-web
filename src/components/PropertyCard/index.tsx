'use client';

import { styled } from '@linaria/react';
import { Property } from '@/types';
import { PropertyContext } from './context';

const Wrapper = styled.div`
	display: block;
	position: relative;

	border-radius: 0.6rem;
	border: 1px solid rgb(229 229 229);

	background-color: #fff;
`;

type PropertyCardProps = React.PropsWithChildren<{
	property: Property;
}>;

const Root = ({ property, children }: PropertyCardProps) => {
	return (
		<PropertyContext.Provider value={property}>
			<Wrapper>{children}</Wrapper>
		</PropertyContext.Provider>
	);
};

Root.displayName = 'PropertyCardRoot';

export { default as Cover } from './Cover';
export { default as Body } from './Body';
export { default as Footer } from './Footer';
export { default as StatusTag } from './PropertyStatusTag';
export { Root };
