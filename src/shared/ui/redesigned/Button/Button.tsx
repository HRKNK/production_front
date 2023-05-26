/* eslint-disable react/display-name */
import React, { type ButtonHTMLAttributes, type ReactNode, memo } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline';
export type ButtonSize = 'm' | 'l' | 'xl';

// наследуем атрибуты кнопки
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: ButtonVariant; // Тема кнопки
	square?: boolean; // Квадратная кнопка?
	size?: ButtonSize; // Размер кнопки
	disabled?: boolean; // disabled?
	children?: ReactNode; // ReactNode
	fullWidth?: boolean; // Растянуть на всю ширину
}

export const Button = memo((props: ButtonProps) => {
	const { className, children, variant = 'outline', square, disabled, fullWidth, size = 'm', ...otherProps } = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled,
		[cls.fullWidth]: fullWidth,
	};

	return (
		<button type="button" className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])} disabled={disabled} {...otherProps}>
			{children}
		</button>
	);
});
