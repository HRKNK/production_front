/* eslint-disable react/display-name */
import React, { type InputHTMLAttributes, type ReactNode, memo, useEffect, useRef, useState } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import { HStack } from '../../Stack/public';
import { Text } from '../../Text/public';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly' | 'size'>;
// Omit позволяет забрать все типы исключив (value / onChange)

type inputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autoFocus?: boolean;
	readonly?: boolean;
	label?: string; // этикетка
	size?: inputSize; // размер инпута
	addonLeft?: ReactNode; // Дополнение слева (иконка)
	addonRight?: ReactNode; // Дополнение справа (иконка)
}

const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		placeholder,
		autoFocus,
		size = 'm',
		label,
		readonly,
		addonLeft,
		addonRight,
		type = 'text',
		...otherProps
	} = props;

	const [isFocus, setIsFocus] = useState(false);

	const onBlur = () => {
		setIsFocus(false);
	};
	const onFocus = () => {
		setIsFocus(true);
	};
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const ref = useRef<HTMLInputElement>();
	useEffect(() => {
		if (autoFocus) {
			setIsFocus(true);
			ref.current?.focus();
		}
	}, [autoFocus]);

	const mods: Mods = {
		[cls.readonly]: readonly,
		[cls.focused]: isFocus,
		[cls.withAddonLeft]: Boolean(addonLeft), // меняем отступ в зависимости от наличия иконки
		[cls.withAddonRight]: Boolean(addonRight),
	};

	const input = (
		<div className={classNames(cls.inputWrapper, mods, [className, cls[size]])}>
			<div className={cls.addonLeft}>{addonLeft && addonLeft}</div>
			<input
				ref={ref}
				type={type}
				value={value}
				onBlur={onBlur}
				onFocus={onFocus}
				onChange={onChangeHandler}
				className={cls.input}
				readOnly={readonly}
				placeholder={placeholder}
				{...otherProps}
			/>
			<div className={cls.addonRight}>{addonRight && addonRight}</div>
		</div>
	);

	if (label) {
		return (
			<HStack max gap="8">
				<Text text={label} />
				{input}
			</HStack>
		);
	}

	return input;
});

export default Input;
