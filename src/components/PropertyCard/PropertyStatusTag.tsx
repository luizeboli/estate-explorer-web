import { screenMinWidth } from '@/styles/breakpoints';
import { styled } from '@linaria/react';
import colors from '@/styles/colors';
import { usePropertyContext } from './context';

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	font-size: 1.4rem;
	font-weight: 500;
	padding: 0.8rem 1.2rem;

	color: #fff;
	background-color: ${colors.purple[500]};

	&:before {
		content: '';
		position: absolute;
		top: 3.21rem;
		left: 0px;
		border-style: solid;
		border-left-width: 0rem;
		border-bottom-color: transparent;
		border-bottom-width: 1.2rem;
		border-top-width: 0rem;
		border-top-color: transparent;
		border-right-width: 2rem;
		border-right-color: transparent;

		${screenMinWidth('sm')} {
			border-right-color: ${colors.purple[700]};
			border-top-color: ${colors.purple[700]};
		}
	}

	${screenMinWidth('sm')} {
		top: 45%;
		left: -2rem;
	}
`;

const PropertyStatusTag = () => {
	const { property_status } = usePropertyContext();

	return (
		<Wrapper>
			<p>{property_status.name}</p>
		</Wrapper>
	);
};

export default PropertyStatusTag;
