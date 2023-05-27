import { type ReactElement, memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
	className?: string;
	content: ReactElement; // скролл контент
	left?: ReactElement; // зафиксированный компонент (left)
	right?: ReactElement; // зафиксированный компонент (right)
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
	const { className, content, left, right } = props;

	return (
		<div className={classNames(cls.MainLayout, {}, [className])}>
			{/* Левый, опциональный */}
			{left && <div className={cls.left}>{left}</div>}
			{/* Контент */}
			<div className={cls.content}>{content}</div>
			{/* Правый, опциональный */}
			{right && <div className={cls.right}>{right}</div>}
		</div>
	);
});
