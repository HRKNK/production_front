import { Suspense, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from 'entities/Comment/public';
import { AddCommentForm } from 'features/addCommentForm/public';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Loader } from 'shared/ui/deprecated/Loader/public';
import { Text as TextDeprecated, TextSize } from 'shared/ui/deprecated/Text/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

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

	const onSendComment = useCallback(
		(text: string) => {
			void dispatch(addCommentForArticle(text));
		},
		[dispatch]
	);

	useInitialEffect(() => {
		void dispatch(fetchCommentsByArticleId(id));
	});

	return (
		<VStack gap="16" max className={classNames('', {}, [className])}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={<Text size="l" title={t('Комментарии')} />}
				off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
			/>
			<Suspense fallback={<Loader />}>
				<AddCommentForm onSendComment={onSendComment} />
			</Suspense>
			<CommentList isLoading={commentsIsLoading} comments={comments} />
		</VStack>
	);
});
