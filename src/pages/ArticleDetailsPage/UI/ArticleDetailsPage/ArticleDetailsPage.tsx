import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { ArticleDetails, ArticleList } from 'entities/Article/public';
import { CommentList } from 'entities/Comment/public';
import { Counter } from 'entities/Counter/public';
import { AddCommentForm } from 'features/addCommentForm/public';
import { ArticleRating } from 'features/articleRating/public';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList/public';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from 'shared/lib/features/public';
import { getFeatureFlag } from 'shared/lib/features/setGetFeatures';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { Card } from 'shared/ui/Card/public';
import { Text, TextSize } from 'shared/ui/Text/public';
import { Page } from 'widgets/Page/Page';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slices/public';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса
	const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

	// const comments = useSelector(getArticleComments.selectAll); // адаптер заменяет свой селектор.
	// const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	// const recommendations = useSelector(getArticleRecommendations.selectAll); // адаптер заменяет свой селектор.
	// const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	// const onBackToList = useCallback(() => { // возврат обратно к списку
	// 	navigate(RoutePath.articles);
	// }, [navigate]);

	// const onSendComment = useCallback((text: string) => {
	// 	void dispatch(addCommentForArticle(text));
	// }, [dispatch]);

	// useInitialEffect(() => {
	// 	void dispatch(fetchCommentsByArticleId(id));
	// 	void dispatch(fetchArticleRecommendations()); // статьи с рекомендациями (ограничение внутри)
	// });

	// if (!id) { // заколхозил в запрос fetchArticleById
	// 	return (
	// 		<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
	// 			{t('Статья не найдена')}
	// 		</div>
	// 	);
	// }

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{/* <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
					{t('Назад к списку')}
				</Button> */}

				{/* Тестовый компонент под фича-флаг */}
				{/* <ToggleFeatures feature="isCounterEnabled" on={<Counter />} off={<Card>{t('`name` скоро появится!')}</Card>} /> */}

				{/* Шапка статей */}
				<ArticleDetailsPageHeader></ArticleDetailsPageHeader>

				{/* Список статей */}
				<ArticleDetails id={id}></ArticleDetails>

				{/* Блок с отзывами */}
				{isArticleRatingEnabled && <ArticleRating articleId={id}></ArticleRating>}

				{/* Блок с рекомендациями. UPD: Перенесено в фичи */}
				<ArticleRecommendationsList></ArticleRecommendationsList>
				{/* <Text size={TextSize.L} className={cls.commentTitle} title={t('Рекомендуем')}/>
				<ArticleList
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					className={cls.recommendations}
					target='_blank'
				/> */}

				{/* Блок с комментариями. UPD: Перенесено в UI сегмент  */}
				<ArticleDetailsComments id={id}></ArticleDetailsComments>
				{/* <Text size={TextSize.L} className={cls.commentTitle} title={t('Комментарии')}/>
				<Text title={t('Комментарии:')}></Text>
				<AddCommentForm onSendComment={onSendComment}></AddCommentForm>
				<CommentList isLoading={commentsIsLoading} comments={comments}></CommentList> */}
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
