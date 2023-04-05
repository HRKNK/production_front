import cls from './ArticleDetailsPage.module.scss';

import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

import { articleDetailsPageReducer } from '../../model/slices/public';

import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';

import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';

import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { ArticleDetails, ArticleList } from 'entities/Article/public';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/public';
import { CommentList } from 'entities/Comment/public';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm/public';

import { RoutePath } from 'shared/config/routeConfig';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Page } from 'widgets/Page/Page';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string, }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса
	const comments = useSelector(getArticleComments.selectAll); // адаптер заменяет свой селектор.
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	const recommendations = useSelector(getArticleRecommendations.selectAll); // адаптер заменяет свой селектор.
	const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// const onBackToList = useCallback(() => { // возврат обратно к списку
	// 	navigate(RoutePath.articles);
	// }, [navigate]);

	const onSendComment = useCallback((text: string) => {
		void dispatch(addCommentForArticle(text));
	}, [dispatch]);

	useInitialEffect(() => {
		void dispatch(fetchCommentsByArticleId(id));
		void dispatch(fetchArticleRecommendations()); // статьи с рекомендациями (ограничение внутри)
	});

	if (!id) {
		return (
			<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{/* <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
					{t('Назад к списку')}
				</Button> */}

				{/* Шапка статей */}
				<ArticleDetailsPageHeader></ArticleDetailsPageHeader>

				{/* Список статей */}
				<ArticleDetails id={id}></ArticleDetails>

				{/* Блок с рекомендациями */}
				<Text size={TextSize.L} className={cls.commentTitle} title={t('Рекомендуем')}/>
				<ArticleList
					articles={recommendations}
					isLoading={recommendationsIsLoading}
					className={cls.recommendations}
					target='_blank'
				/>

				{/* Блок с комментариями */}
				<Text size={TextSize.L} className={cls.commentTitle} title={t('Комментарии')}/>
				<Text title={t('Комментарии:')}></Text>
				<AddCommentForm onSendComment={onSendComment}></AddCommentForm>
				<CommentList isLoading={commentsIsLoading} comments={comments}></CommentList>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
