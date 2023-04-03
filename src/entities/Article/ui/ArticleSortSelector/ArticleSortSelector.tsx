import cls from './ArticleSortSelector.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Select, type SelectOption } from 'shared/ui/Select/public';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { type SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newSort: ArticleSortField) => void;
}

// eslint-disable-next-line react/display-name
export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const { className, onChangeOrder, onChangeSort, order, sort } = props;
	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOption[]>(() => [ // Дженерик в мемо добавляет автокомплит SelectOption[{value, content}]
		{
			value: 'asc',
			content: t('возрастанию'),
		},
		{
			value: 'desc',
			content: t('убыванию'),
		},
	], [t]);

	const sortFieldOptions = useMemo<SelectOption[]>(() => [ // Дженерик в мемо добавляет автокомплит SelectOption[{value, content}]
		{
			value: ArticleSortField.CREATED,
			content: t('дате создания'),
		},
		{
			value: ArticleSortField.TITLE,
			content: t('названию'),
		},
		{
			value: ArticleSortField.VIEWS,
			content: t('просмотрам'),
		},
	], [t]);

	return (
		<div className={classNames(cls.ArticleSortSelector, {}, [className])}>
			<Select
				// сортировка по дате, названию, просмотру
				options={sortFieldOptions}
				label={t('Сортировать по')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select
				// сортировка по возрастанию, убыванию
				options={orderOptions}
				label={t('по')}
				value={order}
				onChange={onChangeOrder}
				className={cls.order}
			/>
		</div>
	);
});
