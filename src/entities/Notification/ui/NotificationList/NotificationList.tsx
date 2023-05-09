import { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/public';
import { VStack } from 'shared/ui/Stack/public';

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

	if (isLoading) {
		return (
			// лоадер
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
