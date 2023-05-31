import { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';
import { toggleFeatures } from 'shared/lib/features/public';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/public';
import { Skeleton as SkeletonRedesigned } from 'shared/ui/redesigned/Skeleton/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const NotificationList = memo((props: NotificationListProps) => {
	const { className } = props;
	const { data, isLoading } = useNotifications(null, {
		pollingInterval: 10000, // таймер на запрос
	});

	// лоадер/скелетон
	const Skeleton = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => SkeletonRedesigned,
		off: () => SkeletonDeprecated,
	});
	if (isLoading) {
		return (
			<VStack gap="16" max className={classNames(cls.NotificationList, {}, [className])}>
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
			</VStack>
		);
	}

	return (
		<VStack gap="16" max className={classNames(cls.NotificationList, {}, [className])}>
			{data?.map(
				(
					item // список уведомлений
				) => (
					<NotificationItem key={item.id} item={item} />
				)
			)}
		</VStack>
	);
});
