import { getArticles } from '../../model/slices/articlesPageSlice';

import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from 'entities/Article/public';
import { Text } from 'shared/ui/Text/public';

interface ArticleInfiniteListProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
	const { className } = props;
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);
	const error = useSelector(getArticlesPageError);
	const { t } = useTranslation();

	if (error) {
		return <Text text={t('Ошибка при загрузке статей')} />;
	}

	return (
		<ArticleList isLoading={isLoading} view={view} articles={articles} className={className}/>
	);
});
