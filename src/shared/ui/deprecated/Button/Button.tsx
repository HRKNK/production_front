/* eslint-disable react/display-name */
import React, { type ButtonHTMLAttributes, type ReactNode, memo } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export enum ThemeButton {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
	OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	// наследуем атрибуты кнопки
	className?: string;
	theme?: ThemeButton;
	square?: boolean;
	size?: ButtonSize;
	disabled?: boolean;
	children?: ReactNode;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const Button = memo((props: ButtonProps) => {
	const { children, className, theme = ThemeButton.OUTLINE, square, size = ButtonSize.M, disabled, ...otherProps } = props;

	const mods: Mods = {
		// Record<string, boolean>
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
		[cls.disabled]: disabled,
	};

	return (
		<button {...otherProps} className={classNames(cls.button, mods, [className, cls[theme]])}>
			{children}
		</button>
	);
});
