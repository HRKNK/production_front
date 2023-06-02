import { type HTMLAttributes, type ReactNode } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'border_round' | 'border_normal' | 'border_partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode; // Реакт компонент
	variant?: CardVariant; // Тема
	max?: boolean; // Растянуть
	padding?: CardPadding; // GAP
	border?: CardBorder; // border-radius
}

// маппер отступов
const mapPaddingToClass: Record<CardPadding, string> = {
	'0': 'gap_0', // классы с GAP из css
	'8': 'gap_8',
	'16': 'gap_16',
	'24': 'gap_24',
};

export const Card = (props: CardProps) => {
	const { className, children, variant = 'normal', max, border = 'border_round', padding = '8', ...otherProps } = props;
	const paddingClass = mapPaddingToClass[padding]; // взять класс соответствующий padding-у

	return (
		<div className={classNames(cls.Card, { [cls.max]: max }, [className, cls[variant], cls[paddingClass], cls[border]])} {...otherProps}>
			{children}
		</div>
	);
};
