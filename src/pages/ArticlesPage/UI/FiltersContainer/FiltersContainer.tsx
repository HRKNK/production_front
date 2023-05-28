/* eslint-disable custom-plugin/public-imports */

/* eslint-disable custom-plugin/layer-imports */

/* eslint-disable custom-plugin/path-checker */
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { type ArticleSortField, type ArticleType, type ArticleView } from 'entities/Article/public';
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { type SortOrder } from 'shared/types/sort';
import { ArticlesFilters } from 'widgets/ArticlesFilters/public';

interface FiltersContainerProps {
	className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
	const { className } = props;

	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	// Подгрузка данных
	const fetchData = useCallback(() => {
		void dispatch(fetchArticlesList({ replace: true }));
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
		<ArticlesFilters
			type={type}
			onChangeSearch={onChangeSearch}
			order={order}
			onChangeOrder={onChangeOrder}
			search={search}
			sort={sort}
			onChangeSort={onChangeSort}
			onChangeType={onChangeType}
			className={className}
		/>
	);
});
