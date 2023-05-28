/* eslint-disable custom-plugin/public-imports */

/* eslint-disable custom-plugin/layer-imports */
import { useTranslation } from 'react-i18next';

import { type ArticleSortField, type ArticleType } from 'entities/Article/public';
import { ArticleSortSelector } from 'features/ArticleSortSelector/public';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/public';
import classNames from 'shared/lib/classNames/classNames';
import { type SortOrder } from 'shared/types/sort';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { Input } from 'shared/ui/redesigned/Input/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	type: ArticleType;
	search: string;
	onChangeSearch: (value: string) => void;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
	onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
	const { className, onChangeOrder, onChangeSearch, onChangeSort, onChangeType, type, order, sort, search } = props;
	const { t } = useTranslation();

	return (
		<Card padding="24" className={classNames(cls.ArticlesFilters, {}, [className])}>
			<VStack gap="32">
				<Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
				<ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
				<ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
			</VStack>
		</Card>
	);
};
