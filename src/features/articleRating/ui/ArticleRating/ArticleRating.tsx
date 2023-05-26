import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from 'entities/Rating/public';
import { getUserAuthData } from 'entities/User/public';
import { Skeleton } from 'shared/ui/deprecated/Skeleton/public';

import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
	const { className, articleId } = props;
	const { t } = useTranslation();
	const userData = useSelector(getUserAuthData);

	const { data, isLoading } = useGetArticleRating({
		// сгенерированный РТК хук
		articleId,
		userId: userData?.id ?? '',
	});
	const [rateArticleMutation] = useRateArticle(); // сгенерированный РТК хук (мутации)

	const handleRateArticle = useCallback(
		(starsCount: number, feedback?: string) => {
			// отправка на сервер
			try {
				void rateArticleMutation({
					userId: userData?.id ?? '',
					articleId,
					rate: starsCount,
					feedback,
				});
			} catch (e) {
				// handle error
				console.log(e);
			}
		},
		[articleId, rateArticleMutation, userData?.id]
	);

	const onAccept = useCallback(
		(starsCount: number, feedback?: string) => {
			// рейтинг + фидбэк
			handleRateArticle(starsCount, feedback);
		},
		[handleRateArticle]
	);

	const onCancel = useCallback(
		(starsCount: number) => {
			// только рейтинг
			handleRateArticle(starsCount);
		},
		[handleRateArticle]
	);

	if (isLoading) {
		return <Skeleton width="100%" height={120} />;
	}

	const rating = data?.[0]; // указанный рейтинг

	return (
		<RatingCard
			onCancel={onCancel}
			onAccept={onAccept}
			className={className}
			rate={rating?.rate} // указанный рейтинг
			title={t('Оцените статью')} // заголовок перед звездами
			feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')} // заголовок фидбэка
			hasFeedback // модалка фидбэка
		/>
	);
});

export default ArticleRating;
