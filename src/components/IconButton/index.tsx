import colors from '@/styles/colors';
import { styled } from '@linaria/react';

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	padding: 0.4rem;
	border-radius: 50%;

	width: 4rem;
	height: 4rem;

	&:focus {
		outline: 1px solid ${colors.purple[500]};
	}
`;

type IconButtonProps<C extends React.ElementType = React.ElementType> = Partial<{
	as: C;
}> &
	React.ButtonHTMLAttributes<HTMLButtonElement> &
	Omit<React.ComponentPropsWithRef<C>, 'as'>;

const IconButton = <C extends React.ElementType>({
	children,
	type = 'button',
	...buttonProps
}: IconButtonProps<C>) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Button type={type} {...buttonProps}>
			{children}
		</Button>
	);
};

export default IconButton;
