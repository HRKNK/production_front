import cls from './ArticlesPage.module.scss';

import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';

import { getArticlesPageError, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleViewSelector, type ArticleView } from 'entities/Article/public';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';

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

	// Смена вида отображения статей (достается из слайса > локал)
	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view));
	}, [dispatch]);

	// Pagination
	const onLoadNextPart = useCallback(() => {
		void dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	useInitialEffect(() => {
		void dispatch(initArticlesPage());
	});

	return (
		// Удаление редьюса
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
				<div className={classNames(cls.ArticlesPage, {}, [className])}>
					{/* Селектор вида отображения статей */}
					<ArticleViewSelector view={view} onViewClick={onChangeView} />
					<ArticleList isLoading={isLoading} view={view} articles={articles}/>
				</div>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
