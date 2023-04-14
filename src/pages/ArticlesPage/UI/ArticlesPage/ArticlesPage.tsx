import cls from './ArticlesPage.module.scss';

import { articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';

import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { useSearchParams } from 'react-router-dom';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll); // массив статей
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);
	const error = useSelector(getArticlesPageError);

	// // Смена вида отображения статей (достается из слайса > локал)
	// const onChangeView = useCallback((view: ArticleView) => {
	// 	dispatch(articlesPageActions.setView(view));
	// }, [dispatch]);

	// Pagination
	const onLoadNextPart = useCallback(() => {
		void dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	// init query params
	const [searchParams, setSearchParams] = useSearchParams();
	useInitialEffect(() => {
		void dispatch(initArticlesPage(searchParams));
	});

	return (
		// Удаление редьюса
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
				{/* Селектор вида отображения статей. UPD: Перенесено в ArticlesPageFilters
				<ArticleViewSelector view={view} onViewClick={onChangeView} /> */}
				{/* Фильтры */}
				<ArticlesPageFilters></ArticlesPageFilters>
				{/* Список статей. UPD: Перенесено в UI сегмент */}
				<ArticleInfiniteList></ArticleInfiniteList>
				{/* <ArticleList isLoading={isLoading} view={view} articles={articles}/> */}
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
