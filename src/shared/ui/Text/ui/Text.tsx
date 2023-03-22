/* eslint-disable react/display-name */
import cls from './Text.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	CENTER = 'center',
	LEFT = 'left',
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

export enum TextSize {
	M = 'size_m',
	L = 'size_l',
}

const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		align = TextAlign.LEFT,
		theme = TextTheme.PRIMARY,
		size = TextSize.M,
	} = props;

	return (
		<div className={classNames(cls.Text, { [cls[theme]]: true, [cls[align]]: true }, [className])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});

export default Text;
