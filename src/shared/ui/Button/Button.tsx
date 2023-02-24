import cls from './Button.module.scss';

import React, { type ButtonHTMLAttributes, type FC } from 'react';

import classNames from 'shared/lib/classNames/classNames';

export enum ThemeButton {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { // наследуем атрибуты кнопки
	className?: string;
	theme?: ThemeButton;
	square?: boolean;
	size?: ButtonSize;
}

const Button: FC<ButtonProps> = (props) => {
	const { children, className, theme, square, size = ButtonSize.M, ...otherProps } = props;

	const mods: Record<string, boolean> = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
	};

	return (
		<button {...otherProps} className={classNames(cls.button, mods, [className, cls[theme]])}>
			{children}
		</button>
	);
};

export default Button;
