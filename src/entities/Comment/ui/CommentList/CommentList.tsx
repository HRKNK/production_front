import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/public';
import { Text } from 'shared/ui/Text/public';

import { type Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

// eslint-disable-next-line react/display-name
export const CommentList = memo((props: CommentListProps) => {
	const { className, isLoading, comments } = props;
	const { t } = useTranslation();

	return (
		<VStack gap="16" max className={classNames(cls.CommentList, {}, [className])}>
			{comments?.length ? ( // Есть массив комментариев / Массива нет
				comments.map((comment) => <CommentCard key={comment.id} isLoading={isLoading} className={cls.comment} comment={comment} />)
			) : (
				<Text text={t('Комментарии отсутствуют')} />
			)}
		</VStack>
	);
});
