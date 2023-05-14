/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article/public';
import classNames from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/public';
import { Text, TextSize } from 'shared/ui/Text/public';

import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';

interface ArticleRecommendationsListProps {
	className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { isLoading, data: articles, error } = useArticleRecommendationsList(3); // сгенерированный РТК хук
	// console.log(articles);

	if (isLoading || error) {
		return null;
	}

	return (
		<VStack data-testid="ArticleRecommendationsList" gap="8" className={classNames('', {}, [className])}>
			<Text size={TextSize.L} title={t('Рекомендуем')} />
			<ArticleList articles={articles} target="_blank" />
		</VStack>
	);
});
