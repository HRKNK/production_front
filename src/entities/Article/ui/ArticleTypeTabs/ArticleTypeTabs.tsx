import { ArticleType } from '../../model/types/article';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { type TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: ArticleType) => void;
}

// eslint-disable-next-line react/display-name
export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, value, onChangeType } = props;
	const { t } = useTranslation();

	const typeTabs = useMemo<TabItem[]>(() => [
		{
			value: ArticleType.ALL,
			content: t('Все статьи'),
		},
		{
			value: ArticleType.IT,
			content: t('Айти'),
		},
		{
			value: ArticleType.ECONOMICS,
			content: t('Экономика'),
		},
		{
			value: ArticleType.SCIENCE,
			content: t('Наука'),
		},
	], [t]);

	const onTabClick = useCallback((tab: TabItem) => {
		onChangeType(tab.value as ArticleType);
	}, [onChangeType]);

	return (
		<Tabs
			// массив табов
			tabs={typeTabs}
			value={value}
			onTabClick={onTabClick}
			className={classNames('', {}, [className])}
		/>
	);
});
