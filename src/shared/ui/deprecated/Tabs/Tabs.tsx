import { type ReactNode, memo, useCallback } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
	value: string;
	content: ReactNode;
}

interface TabsProps {
	className?: string;
	tabs: TabItem[]; // массив табов
	value: string; // выбранное значение
	onTabClick: (tab: TabItem) => void; // переключение табов
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
// eslint-disable-next-line react/display-name
export const Tabs = memo((props: TabsProps) => {
	const { className, tabs, onTabClick, value } = props;

	const clickHandle = useCallback(
		(tab: TabItem) => () => {
			// механизм замыкания пробросит таб
			onTabClick(tab);
		},
		[onTabClick]
	);

	return (
		<div className={classNames(cls.Tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					// если значение текущего таба === выбранному значению
					theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
					className={cls.tab}
					key={tab.value}
					// внутрь передается сам таб
					onClick={clickHandle(tab)}
				>
					{tab.content}
				</Card>
			))}
		</div>
	);
});
