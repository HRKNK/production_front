/* eslint-disable react/display-name */
import { memo } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

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
	'data-testid'?: string;
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3'; // мапер тегов
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	[TextSize.S]: 'h3',
	[TextSize.M]: 'h2',
	[TextSize.L]: 'h1',
};

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
const Text = memo((props: TextProps) => {
	const { className, text, title, align = TextAlign.LEFT, theme = TextTheme.PRIMARY, size = TextSize.M, 'data-testid': dataTestId = 'Text' } = props;

	const mods: Mods = {
		[cls[theme]]: true,
		[cls[align]]: true,
		[cls[size]]: true,
	};

	const HeaderTag = mapSizeToHeaderTag[size]; // по размеру достаем текущий тэг // h1 | h2 | h3

	return (
		<div className={classNames(cls.Text, mods, [className])}>
			{title && (
				<HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
					{title}
				</HeaderTag>
			)}
			{text && (
				<p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
					{text}
				</p>
			)}
		</div>
	);
});

export default Text;
