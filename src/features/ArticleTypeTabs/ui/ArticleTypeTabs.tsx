import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from 'entities/Article/public';
import classNames from 'shared/lib/classNames/classNames';
import { type TabItem, Tabs } from 'shared/ui/deprecated/Tabs/public';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: ArticleType) => void;
}

// eslint-disable-next-line react/display-name
export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, value, onChangeType } = props;
	const { t } = useTranslation();

	const typeTabs = useMemo<TabItem[]>(
		() => [
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
		],
		[t]
	);

	const onTabClick = useCallback(
		(tab: TabItem) => {
			onChangeType(tab.value as ArticleType);
		},
		[onChangeType]
	);

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
