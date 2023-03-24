import cls from './CommentCard.module.scss';

import { type Comment } from '../../model/types/comment';

import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Avatar } from 'shared/ui/Avatar/public';
import { Text } from 'shared/ui/Text/public';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface CommentCardProps {
	className?: string;
	comment: Comment;
	isLoading?: boolean;
}

// eslint-disable-next-line react/display-name
export const CommentCard = memo((props: CommentCardProps) => {
	const { className, comment, isLoading } = props;

	if (isLoading) {
		return (
			<div className={classNames(cls.CommentCard, {}, [className])}>
				<div className={cls.header}>
					{/* Аватар */}
					<Skeleton width={30} height={30} border='50%' />
					{/* Юзернейм */}
					<Skeleton height={16} width={100} className={cls.username} />
				</div>
				{/* Тело сообщения */}
				<Skeleton className={cls.text} width='100%' height={50} />
			</div>
		);
	}

	return (
		<div className={classNames(cls.CommentCard, {}, [className])}>
			<div className={cls.header}>
				{/* Аватар опционален */}
				{comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
				<Text className={cls.username} title={comment.user.username} />
			</div>
			<Text className={cls.text} text={comment.text} />
		</div>
	);
});
