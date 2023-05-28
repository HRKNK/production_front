import { type ReactNode, memo, useCallback } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import { Card } from '../Card/public';
import { Flex, type FlexDirection } from '../Stack/Flex/Flex';
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
	direction?: FlexDirection;
}

// eslint-disable-next-line react/display-name
export const Tabs = memo((props: TabsProps) => {
	const { className, tabs, onTabClick, value, direction = 'row' } = props;

	const clickHandle = useCallback(
		(tab: TabItem) => () => {
			// механизм замыкания пробросит таб
			onTabClick(tab);
		},
		[onTabClick]
	);

	return (
		<Flex align="start" direction={direction} gap="8" className={classNames(cls.Tabs, {}, [className])}>
			{tabs.map((tab) => {
				const isSelected = tab.value === value;
				return (
					<Card
						// если значение текущего таба === выбранному значению
						variant={tab.value === value ? 'light' : 'normal'}
						className={classNames(cls.tab, { [cls.selected]: isSelected }, [className])}
						key={tab.value}
						// внутрь передается сам таб
						onClick={clickHandle(tab)}
						border="border_round"
					>
						{tab.content}
					</Card>
				);
			})}
		</Flex>
	);
});
