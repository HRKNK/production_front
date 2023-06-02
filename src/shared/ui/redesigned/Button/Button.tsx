/* eslint-disable react/display-name */
import React, { type ButtonHTMLAttributes, type ReactNode, memo } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
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
	color?: ButtonColor; // Цвет кнопки

	addonLeft?: ReactNode; // Дополнение слева (иконка)
	addonRight?: ReactNode; // Дополнение справа (иконка)
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		addonLeft,
		addonRight,
		variant = 'outline',
		color = 'normal',
		square,
		disabled,
		fullWidth,
		size = 'm',
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled,
		[cls.fullWidth]: fullWidth,
		[cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight), // меняем отступы с иконкой
	};

	return (
		<button
			type="button"
			className={classNames(cls.Button, mods, [className, cls[color], cls[variant], cls[size]])}
			disabled={disabled}
			{...otherProps}
		>
			<div className={cls.addonLeft}>{addonLeft && addonLeft}</div>
			{children}
			<div className={cls.addonRight}>{addonRight && addonRight}</div>
		</button>
	);
});
