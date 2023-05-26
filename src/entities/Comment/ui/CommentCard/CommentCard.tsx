import { memo } from 'react';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import classNames from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/deprecated/AppLink/public';
import { Avatar } from 'shared/ui/deprecated/Avatar/public';
import { Skeleton } from 'shared/ui/deprecated/Skeleton/public';
import { Text } from 'shared/ui/deprecated/Text/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';

import { type Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

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
			<VStack gap="8" max className={classNames(cls.CommentCard, {}, [className])}>
				<div className={cls.header}>
					{/* Аватар */}
					<Skeleton width={30} height={30} border="50%" />
					{/* Юзернейм */}
					<Skeleton height={16} width={100} className={cls.username} />
				</div>
				{/* Тело сообщения */}
				<Skeleton className={cls.text} width="100%" height={50} />
			</VStack>
		);
	}

	return (
		<VStack data-testid="CommentCard.Content" gap="8" max className={classNames(cls.CommentCard, {}, [className])}>
			{/* to = переход в профиль по ид /profile/1 */}
			<AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
				{/* Аватар опционален */}
				{comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
				<Text className={cls.username} title={comment.user.username} />
			</AppLink>
			<Text className={cls.text} text={comment.text} />
		</VStack>
	);
});
