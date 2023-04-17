import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Text, TextSize } from 'shared/ui/Text/public';
import { AddCommentForm } from 'features/addCommentForm/public';
import { CommentList } from 'entities/Comment/public';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

// eslint-disable-next-line react/display-name
export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
	const { className, id } = props;
	const { t } = useTranslation();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const dispatch = useAppDispatch();

	const onSendComment = useCallback((text: string) => {
		void dispatch(addCommentForArticle(text));
	}, [dispatch]);

	useInitialEffect(() => {
		void dispatch(fetchCommentsByArticleId(id));
	});

	return (
		<VStack gap='16' max className={classNames('', {}, [className])}>
			<Text
				size={TextSize.L}
				title={t('Комментарии')}
			/>
			<AddCommentForm onSendComment={onSendComment} />
			<CommentList
				isLoading={commentsIsLoading}
				comments={comments}
			/>
		</VStack>
	);
});
