/* eslint-disable react/display-name */

/* eslint-disable @typescript-eslint/no-floating-promises */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { type ArticleSortField, type ArticleType, type ArticleView, ArticleViewSelector } from 'entities/Article/public';
import { ArticleSortSelector } from 'features/ArticleSortSelector/public';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/public';
import classNames from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { type SortOrder } from 'shared/types/sort';
import { Card } from 'shared/ui/Card/public';
import { Input } from 'shared/ui/Input/public';

import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
	className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	// Подгрузка данных
	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }));
	}, [dispatch]);
	// Подгрузка данных с задержкой
	const debouncedFetchData = useDebounce(fetchData, 500);

	// Смена вида отображения статей (достается из слайса > локал)
	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	// сортировка по дате, названию, просмотру
	const onChangeSort = useCallback(
		(newSort: ArticleSortField) => {
			dispatch(articlesPageActions.setSort(newSort));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	// сортировка по возрастанию, убыванию
	const onChangeOrder = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesPageActions.setOrder(newOrder));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	// сортировка по инпуту
	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search));
			dispatch(articlesPageActions.setPage(1));
			debouncedFetchData();
		},
		[debouncedFetchData, dispatch]
	);

	// сортировка по типу статьи
	const onChangeType = useCallback(
		(value: ArticleType) => {
			dispatch(articlesPageActions.setType(value));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	return (
		<div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
			<div className={cls.sortWrapper}>
				<ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
				{/* Смена вида отображения статей (достается из слайса > локал) */}
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</div>
			<Card className={cls.search}>
				<Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
			</Card>
			<ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
		</div>
	);
});
