import cls from './Card.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { type HTMLAttributes, memo, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

// eslint-disable-next-line react/display-name
export const Card = memo((props: CardProps) => {
	const { className, children, ...otherProps } = props;

	return (
		<div className={classNames(cls.Card, {}, [className])} {...otherProps}>
			{children}
		</div>
	);
});
