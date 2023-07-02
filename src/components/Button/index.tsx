import themeColors from '@/styles/colors';
import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';

const colors = {
	primary: css`
		&.text {
			--color: ${themeColors.purple[700]};
			--background-color: transparent;
			--background-color-hover: ${themeColors.purple[100]};
			--outline-color-focus: ${themeColors.purple[700]};
		}

		&.contained {
			--color: #fff;
			--background-color: ${themeColors.purple[500]};
			--background-color-hover: ${themeColors.purple[700]};
			--outline-color-focus: ${themeColors.purple[500]};
			--box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		}

		&.outlined {
			--color: ${themeColors.purple[500]};
			--background-color-hover: ${themeColors.purple[100]};
			--outline-color-focus: ${themeColors.purple[700]};
			--border-color: ${themeColors.purple[500]};
		}
	`,
	secondary: css``,
};

const StyledButton = styled.button<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
	font-size: 1.4rem;
	font-weight: 500;
	padding: 0.8rem 1.2rem;
	border-radius: 0.6rem;
	box-shadow: ${({ disableElevation }) => (disableElevation ? 'none' : `var(--box-shadow)`)};
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};

	color: var(--color);
	background-color: var(--background-color);

	&.outlined {
		border: 1px solid var(--border-color);
	}

	&:hover:not(:disabled) {
		background-color: var(--background-color-hover);
	}

	&:focus {
		outline: 2px solid var(--outline-color-focus);
		outline-offset: 2px;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.54;
	}
`;

type ButtonVariant = 'contained' | 'text' | 'outlined';

type ButtonColor = 'primary' | 'secondary';

type ButtonProps = Partial<{
	variant: ButtonVariant;
	color: ButtonColor;
	startIcon: React.ReactNode;
	endIcon: React.ReactNode;
	disableElevation: boolean;
	fullWidth: boolean;
}> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	children,
	type = 'button',
	variant = 'text',
	color = 'primary',
	startIcon = null,
	endIcon = null,
	...buttonProps
}: ButtonProps) => {
	const colorStyles = colors[color];

	return (
		<StyledButton
			type={type}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...buttonProps}
			color={color}
			variant={variant}
			className={cx(colorStyles, variant)}
		>
			{!!startIcon && startIcon}
			{children}
			{!!endIcon && endIcon}
		</StyledButton>
	);
};

export default Button;
