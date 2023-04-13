/* eslint-disable react/display-name */
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/public';
import { ArticleList } from 'entities/Article/public';
import { VStack } from 'shared/ui/Stack/public';

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
		<VStack gap='8' className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t('Рекомендуем')}
			/>
			<ArticleList
				articles={articles}
				target='_blank'
			/>
		</VStack>
	);
});
