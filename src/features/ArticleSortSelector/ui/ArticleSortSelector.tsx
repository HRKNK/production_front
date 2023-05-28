import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from 'entities/Article/public';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { type SortOrder } from 'shared/types/sort';
import { Select, type SelectOption } from 'shared/ui/deprecated/Select/public';
import { ListBox } from 'shared/ui/redesigned/ListBox/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import cls from './ArticleSortSelector.module.scss';

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

	const orderOptions = useMemo<SelectOption[]>(
		() => [
			// Дженерик в мемо добавляет автокомплит SelectOption[{value, content}]
			{
				value: 'asc',
				content: t('возрастанию'),
			},
			{
				value: 'desc',
				content: t('убыванию'),
			},
		],
		[t]
	);

	const sortFieldOptions = useMemo<SelectOption[]>(
		() => [
			// Дженерик в мемо добавляет автокомплит SelectOption[{value, content}]
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
		],
		[t]
	);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
					<VStack gap="8">
						<Text text="Сортировать по:" />
						<ListBox
							// сортировка по дате, названию, просмотру
							items={sortFieldOptions}
							value={sort}
							onChange={onChangeSort}
						/>
						<ListBox
							// сортировка по возрастанию, убыванию
							items={orderOptions}
							value={order}
							onChange={onChangeOrder}
						/>
					</VStack>
				</div>
			}
			off={
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
			}
		/>
	);
});
