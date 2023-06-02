import { memo } from 'react';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { toggleFeatures } from 'shared/lib/features/toggleFeatures';
import { AppLink as AppLinkDeprecated } from 'shared/ui/deprecated/AppLink/public';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/public';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/public';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/public';
import { AppLink } from 'shared/ui/redesigned/AppLink/public';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Card } from 'shared/ui/redesigned/Card/Card';
import { Skeleton as SkeletonRedesigned } from 'shared/ui/redesigned/Skeleton/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

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

	const Skeleton = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => SkeletonRedesigned,
		off: () => SkeletonDeprecated,
	});

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
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card padding="24" border="border_round" max>
					<VStack data-testid="CommentCard.Content" gap="8" max className={classNames(cls.CommentCardRedesigned, {}, [className])}>
						{/* to = переход в профиль по ид /profile/1 */}
						<AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
							{/* Аватар опционален */}
							{comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
							<Text className={cls.username} title={comment.user.username} bold />
						</AppLink>
						<Text text={comment.text} bold />
					</VStack>
				</Card>
			}
			off={
				<VStack data-testid="CommentCard.Content" gap="8" max className={classNames(cls.CommentCard, {}, [className])}>
					{/* to = переход в профиль по ид /profile/1 */}
					<AppLinkDeprecated to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
						{/* Аватар опционален */}
						{comment.user.avatar ? <AvatarDeprecated size={30} src={comment.user.avatar} /> : null}
						<TextDeprecated className={cls.username} title={comment.user.username} />
					</AppLinkDeprecated>
					<TextDeprecated className={cls.text} text={comment.text} />
				</VStack>
			}
		/>
	);
});
