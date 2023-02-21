import cls from './Button.module.scss';

import React, { type ButtonHTMLAttributes, type FC } from 'react';

import classNames from 'shared/lib/classNames/classNames';

export enum ThemeButton {
	CLEAR = 'clear',
	OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { // наследуем атрибуты кнопки
	className?: string;
	theme?: ThemeButton;
}

const Button: FC<ButtonProps> = (props) => {
	const { children, className, theme, ...otherProps } = props;

	return (
		<button {...otherProps} className={classNames(cls.button, {}, [className, cls[theme]])}>
			{children}
		</button>
	);
};

export default Button;
