'use client';

import colors from '@/styles/colors';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { InputHTMLAttributes, useId } from 'react';

type CheckboxProps = { label: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>;

const Marker = styled.div`
	position: relative;
	width: 2rem;
	height: 2rem;
	border-radius: 0.4rem;
	background-color: ${colors.neutral[200]};

	&::after {
		content: '';
		position: absolute;
		display: none;
		left: 0.75rem;
		top: 0.25rem;
		width: 0.4rem;
		height: 1rem;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
`;

const Input = styled.input`
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;

	&:focus + ${Marker} {
		outline: 1px solid ${colors.purple[500]};
		outline-offset: 2px;
		outline-width: 2px;
	}

	&:checked + ${Marker} {
		background-color: ${colors.purple[500]};
		&::after {
			display: block;
		}
	}
`;

const labelClassName = css`
	position: relative;
	cursor: pointer;
	display: flex;
	gap: 0.8rem;

	&:hover {
		${Marker} {
			background-color: ${colors.neutral[300]};
		}

		& ${Input}:checked + ${Marker} {
			background-color: ${colors.purple[700]};
		}
	}
`;

const Checkbox = (props: CheckboxProps) => {
	const { label, ...inputProps } = props;
	const id = useId();

	return (
		<label htmlFor={id} className={labelClassName}>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<Input type="checkbox" id={id} {...inputProps} />
			<Marker />
			{label}
		</label>
	);
};

export default Checkbox;
