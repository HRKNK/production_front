/* eslint-disable custom-plugin/public-imports */

/* eslint-disable custom-plugin/layer-imports */

/* eslint-disable custom-plugin/path-checker */
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { type ArticleView, ArticleViewSelector } from 'entities/Article/public';
import { getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ViewSelectorContainerProps {
	className?: string;
}

export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView);

	// Смена вида отображения статей (достается из слайса > локал)
	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />;
});
