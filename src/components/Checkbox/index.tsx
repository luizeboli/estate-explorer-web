'use client';

import { InputHTMLAttributes, useId } from 'react';

type CheckboxProps = { label: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>;

const Checkbox = (props: CheckboxProps) => {
	const { label, ...inputProps } = props;
	const id = useId();

	return (
		<label htmlFor={id}>
			{/*  eslint-disable-next-line react/jsx-props-no-spreading */}
			<input type="checkbox" id={id} {...inputProps} />
			{label}
		</label>
	);
};

export default Checkbox;
