import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ArticlePageGreeting } from 'features/articlePageGreeting/public';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page/Page';

import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPage.module.scss';

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
			<Page data-testid={'ArticlesPage'} onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
				{/* Приветственное уведомление */}
				<ArticlePageGreeting />

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
