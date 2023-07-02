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
		outline: 1px solid rgb(168 85 247);
	}
`;

type IconButtonProps = Partial<{}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, type = 'button', ...buttonProps }: IconButtonProps) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Button type={type} {...buttonProps}>
			{children}
		</Button>
	);
};

export default IconButton;
