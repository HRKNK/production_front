import cls from './ArticlesPage.module.scss';

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleViewSelector, type ArticleView } from 'entities/Article/public';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesPageActions, articlesPageReducer, getArticles } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

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

	useInitialEffect(() => {
		void dispatch(fetchArticlesList());
		dispatch(articlesPageActions.initState()); // достаем текущий вид отображения страницы
	});

	return (
		// Удаление редьюса
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.ArticlesPage, {}, [className])}>
				<div className={classNames(cls.ArticlesPage, {}, [className])}>
					{/* Селектор вида отображения статей */}
					<ArticleViewSelector view={view} onViewClick={onChangeView} />
					<ArticleList isLoading={isLoading} view={view} articles={articles}/>
				</div>
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
