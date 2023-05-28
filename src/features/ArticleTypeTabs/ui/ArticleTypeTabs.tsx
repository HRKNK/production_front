import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from 'entities/Article/public';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { type TabItem, Tabs as TabsDeprecated } from 'shared/ui/deprecated/Tabs/public';
import { Tabs } from 'shared/ui/redesigned/Tabs/public';

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
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Tabs
					// массив табов
					tabs={typeTabs}
					value={value}
					onTabClick={onTabClick}
					className={classNames('', {}, [className])}
					direction="column"
				/>
			}
			off={
				<TabsDeprecated
					// массив табов
					tabs={typeTabs}
					value={value}
					onTabClick={onTabClick}
					className={classNames('', {}, [className])}
				/>
			}
		/>
	);
});
