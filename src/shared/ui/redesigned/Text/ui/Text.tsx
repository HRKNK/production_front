/* eslint-disable react/display-name */
import { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';
export type TextAlign = 'right' | 'left' | 'center';
export type TextSize = 's' | 'm' | 'l';

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	bold?: boolean; // жирный?
	'data-testid'?: string;
	cut?: number;
}

type HeaderTagType = 'h1' | 'h2' | 'h3'; // мапер тегов
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	s: 'h3',
	m: 'h2',
	l: 'h1',
};

const mapSizeToClass: Record<TextSize, string> = {
	s: cls.size_s,
	m: cls.size_m,
	l: cls.size_l,
};

// function-helper
const textCutting = (text: string, cutoffValue: number): string => {
	if (text.length > cutoffValue) {
		return `${text.slice(0, cutoffValue).trim()}...`;
	}
	return text;
};

export const Text = memo((props: TextProps) => {
	const { className, text, title, bold, cut = 0, variant = 'primary', align = 'left', size = 'm', 'data-testid': dataTestId = 'Text' } = props;

	const HeaderTag = mapSizeToHeaderTag[size]; // по размеру достаем текущий тэг // h1 | h2 | h3
	const sizeClass = mapSizeToClass[size];

	const additionalClasses = [className, cls[variant], cls[align], sizeClass];

	return (
		<div className={classNames(cls.Text, { [cls.bold]: bold }, additionalClasses)}>
			{title && (
				<HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
					{cut ? textCutting(title, cut) : title}
				</HeaderTag>
			)}
			{text && (
				<p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
					{cut ? textCutting(text, cut) : text}
				</p>
			)}
		</div>
	);
});
